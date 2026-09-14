import { Request, Response } from 'express';
import { prisma } from "../config/prisma";

export class PromotionController {

    // ==========================================
    // CREATE - Create Promotion
    // ==========================================
    static async createPromotion(req: Request, res: Response) {
        try {
            const { category, discount, time_days, time_hours, time_minutes } = req.body;

            const expiresAt = new Date();
            expiresAt.setDate(expiresAt.getDate() + time_days);
            expiresAt.setHours(expiresAt.getHours() + time_hours);
            expiresAt.setMinutes(expiresAt.getMinutes() + time_minutes);

            if (category === 'all') {
                await prisma.promotion.updateMany({
                    where: { isActive: true },
                    data: { isActive: false }
                });
            } else {
                await prisma.promotion.updateMany({
                    where: { category: category, isActive: true },
                    data: { isActive: false }
                });
            }

            const newPromotion = await prisma.promotion.create({
                data: {
                    category: category,
                    discount: discount,
                    days: time_days,
                    hours: time_hours,
                    minutes: time_minutes,
                    expiresAt,
                    isActive: true
                }
            });

            return res.status(201).json({
                message: 'Promoção criada com sucesso!',
                promotion: newPromotion
            });
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    // ==========================================
    // READ - Get all promotions
    // ==========================================
    static async getActivePromotions(req: Request, res: Response) {
        try {
            const now = new Date();

            await prisma.promotion.updateMany({
                where: {
                    expiresAt: { lt: now },
                    isActive: true
                },
                data: { isActive: false }
            });

            const activePromotions = await prisma.promotion.findMany({
                where: { isActive: true },
                orderBy: { createdAt: 'desc' }
            });

            return res.status(200).json(activePromotions);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    // ==========================================
    // DELETE / CANCEL - Delete a promotion
    // ==========================================
    static async deletePromotion(req: Request, res: Response) {
        try {
            const { identifier } = req.params as { identifier: string };

            const normalizedIdOrCategory = identifier.toLowerCase();
            const validCategories = ['vips', 'caixas', 'passes', 'all'];

            if (validCategories.includes(normalizedIdOrCategory)) {
                if (normalizedIdOrCategory === 'all') {
                    await prisma.promotion.updateMany({
                        where: { isActive: true },
                        data: { isActive: false }
                    });
                } else {
                    await prisma.promotion.updateMany({
                        where: { category: normalizedIdOrCategory, isActive: true },
                        data: { isActive: false }
                    });
                }

                return res.status(200).json({ message: `Todas as promoções da categoria '${normalizedIdOrCategory}' foram encerradas com sucesso.` });
            }

            const promotion = await prisma.promotion.findUnique({
                where: { id: identifier }
            });

            if (!promotion) {
                return res.status(404).json({ message: 'Promoção não encontrada.' });
            }

            await prisma.promotion.update({
                where: { id: identifier },
                data: { isActive: false }
            });

            return res.status(200).json({ message: 'Promoção encerrada com sucesso.' });
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }
}