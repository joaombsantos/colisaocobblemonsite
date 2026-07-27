"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandService = void 0;
const client_1 = require("@prisma/client");
const rcon_client_1 = require("rcon-client");
const prisma_1 = require("../config/prisma");
class CommandService {
    static getRconCredentials(server) {
        switch (server) {
            case client_1.ServerType.KANTO:
                return {
                    host: process.env.RCON_KANTO_HOST,
                    port: parseInt(process.env.RCON_KANTO_PORT),
                    password: process.env.RCON_KANTO_PASSWORD,
                };
            case client_1.ServerType.KANTO_PLUS:
                return {
                    host: process.env.RCON_KANTO_PLUS_HOST,
                    port: parseInt(process.env.RCON_KANTO_PLUS_PORT),
                    password: process.env.RCON_KANTO_PLUS_PASSWORD,
                };
            case client_1.ServerType.SURVIVAL:
                return {
                    host: process.env.RCON_SURVIVAL_HOST,
                    port: parseInt(process.env.RCON_SURVIVAL_PORT),
                    password: process.env.RCON_SURVIVAL_PASSWORD,
                };
            default:
                throw new Error(`Servidor desconhecido: ${server}`);
        }
    }
    static async executeCartCommands(nick) {
        const cart = await prisma_1.prisma.cart.findUnique({
            where: { nick },
            include: {
                items: { include: { product: true } }
            }
        });
        if (!cart || cart.items.length === 0)
            return;
        const commandsByServer = {};
        for (const item of cart.items) {
            const rawCommand = item.product.command || "";
            const quantity = item.quantity;
            const server = item.product.server;
            const requireOnline = item.product.requireOnline;
            let parsedCommand = rawCommand
                .replace(/nick/g, nick)
                .replace(/\{nick\}/g, nick)
                .replace(/quantity/g, quantity.toString())
                .replace(/\{quantity\}/g, quantity.toString())
                .replace(/amount/g, quantity.toString())
                .replace(/\{amount\}/g, quantity.toString());
            parsedCommand = parsedCommand.replace(/(\d+)\*(\d+)([a-zA-Z]+)/g, (match, p1, p2, unit) => {
                const resultado = parseInt(p1) * parseInt(p2);
                return resultado + unit;
            });
            const timesToRun = (rawCommand.includes('quantity') || rawCommand.includes('amount')) ? 1 : quantity;
            if (requireOnline) {
                const commandsToQueue = [];
                for (let i = 0; i < timesToRun; i++) {
                    commandsToQueue.push({
                        nick: nick,
                        command: parsedCommand,
                        server: server
                    });
                }
                await prisma_1.prisma.deliveryQueue.createMany({ data: commandsToQueue });
                console.log(`[FILA - ${server}] ${commandsToQueue.length} comandos agendados via Mod para ${nick}`);
            }
            else {
                if (!commandsByServer[server]) {
                    commandsByServer[server] = [];
                }
                commandsByServer[server].push({ parsedCommand, timesToRun, rawItem: item });
            }
        }
        for (const [serverName, itemsToDeliver] of Object.entries(commandsByServer)) {
            if (itemsToDeliver.length === 0)
                continue;
            const serverType = serverName;
            const credentials = this.getRconCredentials(serverType);
            let rconSuccess = false;
            try {
                console.log(`[RCON] Conectando ao servidor ${serverName} (${credentials.host}:${credentials.port})...`);
                const rcon = await rcon_client_1.Rcon.connect({
                    host: credentials.host,
                    port: credentials.port,
                    password: credentials.password,
                });
                rconSuccess = true;
                for (const item of itemsToDeliver) {
                    for (let i = 0; i < item.timesToRun; i++) {
                        const cleanCmd = item.parsedCommand.startsWith('/') ? item.parsedCommand.substring(1) : item.parsedCommand;
                        console.log(`[RCON - ${serverName}] Enviando: ${cleanCmd}`);
                        const response = await rcon.send(cleanCmd);
                        if (response) {
                            console.log(`[RCON - ${serverName}] Resposta do Servidor: ${response}`);
                        }
                    }
                }
                await rcon.end();
                console.log(`[RCON] Conexão com ${serverName} encerrada com sucesso.`);
            }
            catch (error) {
                console.error(`[ERRO RCON - ${serverName}] Falha no RCON. Movendo produtos para a fila do Mod:`, error.message);
                const commandsToQueue = [];
                for (const item of itemsToDeliver) {
                    for (let i = 0; i < item.timesToRun; i++) {
                        commandsToQueue.push({
                            nick: nick,
                            command: item.parsedCommand,
                            server: serverName
                        });
                    }
                }
                if (commandsToQueue.length > 0) {
                    await prisma_1.prisma.deliveryQueue.createMany({ data: commandsToQueue });
                    console.log(`[SUPORTE MOD - ${serverName}] ${commandsToQueue.length} comandos salvos no banco para o jogador retirar in-game.`);
                }
            }
        }
        await prisma_1.prisma.cart.deleteMany({
            where: { nick: nick }
        });
        console.log(`[LOJA] Processo concluído e carrinho esvaziado para o jogador: ${nick}`);
    }
}
exports.CommandService = CommandService;
//# sourceMappingURL=CommandService.js.map