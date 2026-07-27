"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryController = void 0;
const prisma_1 = require("../config/prisma");
class DeliveryController {
    static async getPendingCommands(req, res) {
        const server = req.query.server;
        const nick = req.query.nick;
        try {
            const pending = await prisma_1.prisma.deliveryQueue.findMany({
                where: {
                    nick: nick,
                    server: server
                }
            });
            return res.status(200).json(pending);
        }
        catch (error) {
            return res.status(500).json({ error: "Erro ao buscar comandos." });
        }
    }
    static async getBulkPendingCommands(req, res) {
        const server = req.query.server;
        const nicksQuery = req.query.nicks;
        if (!nicksQuery) {
            return res.status(200).json({});
        }
        try {
            const nicksArray = nicksQuery.split(",");
            const pendingCommands = await prisma_1.prisma.deliveryQueue.findMany({
                where: {
                    server: server,
                    nick: { in: nicksArray }
                }
            });
            const groupedResult = {};
            for (const nick of nicksArray) {
                groupedResult[nick] = [];
            }
            for (const cmd of pendingCommands) {
                if (groupedResult[cmd.nick]) {
                    groupedResult[cmd.nick].push(cmd);
                }
            }
            return res.status(200).json(groupedResult);
        }
        catch (error) {
            console.error("[ERRO BULK]", error);
            return res.status(500).json({ error: "Erro ao buscar comandos em massa." });
        }
    }
    static async completeDelivery(req, res) {
        const { ids } = req.body;
        try {
            await prisma_1.prisma.deliveryQueue.deleteMany({
                where: { id: { in: ids } }
            });
            return res.status(200).json({ success: true });
        }
        catch (error) {
            return res.status(500).json({ error: "Erro ao confirmar entrega." });
        }
    }
}
exports.DeliveryController = DeliveryController;
//# sourceMappingURL=DeliveryController.js.map