import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { prisma } from "../config/prisma";

export class DeliveryController {
    static async getPendingCommands(req: Request, res: Response) {
        const server = req.query.server as string;
        const nick = req.query.nick as string;

        try {
            const pending = await prisma.deliveryQueue.findMany({
                where: { 
                    nick: nick,
                    server: server as any
                }
            });

            return res.status(200).json(pending);
        } catch (error) {
            return res.status(500).json({ error: "Erro ao buscar comandos." });
        }
    }

    static async getBulkPendingCommands(req: Request, res: Response) {
        const server = req.query.server as string;
        const nicksQuery = req.query.nicks as string;

        if (!nicksQuery) {
            return res.status(200).json({});
        }

        try {
            const nicksArray = nicksQuery.split(",");

            const pendingCommands = await prisma.deliveryQueue.findMany({
                where: {
                    server: server as any,
                    nick: { in: nicksArray }
                }
            });
            const groupedResult: Record<string, typeof pendingCommands> = {};

            for (const nick of nicksArray) {
                groupedResult[nick] = [];
            }

            for (const cmd of pendingCommands) {
                if (groupedResult[cmd.nick]) {
                    groupedResult[cmd.nick]!.push(cmd);
                }
            }

            return res.status(200).json(groupedResult);
        } catch (error) {
            console.error("[ERRO BULK]", error);
            return res.status(500).json({ error: "Erro ao buscar comandos em massa." });
        }
    }

    static async completeDelivery(req: Request, res: Response) {
        const { ids } = req.body;

        try {
            await prisma.deliveryQueue.deleteMany({
                where: { id: { in: ids } }
            });

            return res.status(200).json({ success: true });
        } catch (error) {
            return res.status(500).json({ error: "Erro ao confirmar entrega." });
        }
    }
}