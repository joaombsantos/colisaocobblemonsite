import { prisma } from "../config/prisma";

export class PromotionHelper {
    private static async getActivePromotions() {
        const now = new Date();

        await prisma.promotion.updateMany({
            where: { expiresAt: { lt: now }, isActive: true },
            data: { isActive: false }
        });

        return await prisma.promotion.findMany({
            where: { isActive: true, expiresAt: { gt: now } }
        });
    }

    static async applyToProducts(products: any[]) {
        if (!products || products.length === 0) return products;

        const activePromotions = await PromotionHelper.getActivePromotions();

        if (activePromotions.length === 0) {
            return products.map(p => ({ ...p, hasPromotion: false }));
        }

        return products.map(product => {
            const promotion = activePromotions.find(
                p => p.category === product.category.toLowerCase() || p.category === 'all'
            );

            if (promotion) {
                const originalPrice = Number(product.price);
                const discountPercentage = Number(promotion.discount);
                const discountedPrice = originalPrice - (originalPrice * (discountPercentage / 100));

                return {
                    ...product,
                    originalPrice,
                    discountPercentage,
                    price: Number(discountedPrice.toFixed(2)),
                    hasPromotion: true,
                    expiresAt: promotion.expiresAt
                };
            }

            return { ...product, hasPromotion: false };
        });
    }

    static async applyToCartItems(items: any[]) {
        if (!items || items.length === 0) return items;

        const activePromotions = await PromotionHelper.getActivePromotions();

        return items.map(item => {
            const product = item.product;
            if (!product) return item;

            const promotion = activePromotions.find(
                p => p.category === product.category.toLowerCase() || p.category === 'all'
            );

            if (promotion) {
                const originalPrice = Number(product.price);
                const discountPercentage = Number(promotion.discount);
                const discountedPrice = originalPrice - (originalPrice * (discountPercentage / 100));

                return {
                    ...item,
                    product: {
                        ...product,
                        originalPrice,
                        discountPercentage,
                        price: Number(discountedPrice.toFixed(2)),
                        hasPromotion: true,
                        expiresAt: promotion.expiresAt
                    }
                };
            }

            return {
                ...item,
                product: {
                    ...product,
                    hasPromotion: false
                }
            };
        });
    }

    static async calculateCartTotal(cartItems: any[]): Promise<number> {
        if (!cartItems || cartItems.length === 0) return 0;

        const discountedItems = await PromotionHelper.applyToCartItems(cartItems);

        return discountedItems.reduce((total, item) => {
            return total + (Number(item.product.price) * item.quantity);
        }, 0);
    }
}