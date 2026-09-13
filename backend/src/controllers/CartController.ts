import { Request, Response } from "express";
import { prisma } from "../config/prisma";

export class CartController {

    // ==========================================
    // UTILS - Aplicar promoções aos produtos do carrinho
    // ==========================================
    private static async applyPromotionsToCartItems(items: any[]) {
        if (!items || items.length === 0) return items;

        const now = new Date();

        await prisma.promotion.updateMany({
            where: { expiresAt: { lt: now }, isActive: true },
            data: { isActive: false }
        });

        const activePromotions = await prisma.promotion.findMany({
            where: { isActive: true, expiresAt: { gt: now } }
        });

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

    // ==========================================
    // GET - Get player's cart
    // ==========================================
    static async getCart(req: Request, res: Response) {
        try {
            const nick = req.params.nick as string;

            if (!nick) {
                return res.status(400).json({ error: "Player's nick is required." });
            }

            let cart = await prisma.cart.findUnique({
                where: { nick },
                include: {
                    items: {
                        include: {
                            product: true,
                        },
                    },
                },
            });

            if (!cart) {
                cart = await prisma.cart.create({
                    data: { nick },
                    include: {
                        items: {
                            include: { product: true },
                        },
                    },
                });
            }

            const itemsWithDiscount = await CartController.applyPromotionsToCartItems(cart.items);

            return res.status(200).json({
                ...cart,
                items: itemsWithDiscount
            });
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    // ==========================================
    // POST - Add a product to cart
    // ==========================================
    static async addItem(req: Request, res: Response) {
        try {
            const { nick, productId, quantity } = req.body;

            if (!nick || !productId) {
                return res.status(400).json({ error: "Nick and Product ID are required." });
            }

            const playerNick = nick as string;
            const qty = quantity ?? 1;

            const product = await prisma.product.findUnique({
                where: { id: productId },
            });

            if (!product) {
                return res.status(404).json({ error: "Product not found." });
            }

            let cart = await prisma.cart.findUnique({
                where: { nick: playerNick },
            });

            if (!cart) {
                cart = await prisma.cart.create({
                    data: { nick: playerNick },
                });
            }

            const existingItem = await prisma.cartItem.findFirst({
                where: {
                    cartId: cart.id,
                    productId: productId,
                },
            });

            if (existingItem) {
                await prisma.cartItem.update({
                    where: { id: existingItem.id },
                    data: { quantity: existingItem.quantity + qty },
                });
            } else {
                await prisma.cartItem.create({
                    data: {
                        cartId: cart.id,
                        productId: productId,
                        quantity: qty,
                    },
                });
            }

            const updatedCart = await prisma.cart.findUnique({
                where: { id: cart.id },
                include: {
                    items: {
                        include: { product: true },
                    },
                },
            });

            const itemsWithDiscount = await CartController.applyPromotionsToCartItems(updatedCart?.items || []);

            return res.status(200).json({
                ...updatedCart,
                items: itemsWithDiscount
            });
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    // ==========================================
    // UPDATE - Update an item quantity
    // ==========================================
    static async updateItemQuantity(req: Request, res: Response) {
        try {
            const { nick, productId, quantity } = req.body;

            if (!nick || !productId || quantity === undefined) {
                return res.status(400).json({ error: "Insuficient data." });
            }

            const playerNick = nick as string;

            const cart = await prisma.cart.findUnique({
                where: { nick: playerNick },
            });

            if (!cart) {
                return res.status(404).json({ error: "Cart not found." });
            }

            const cartItem = await prisma.cartItem.findFirst({
                where: {
                    cartId: cart.id,
                    productId: productId,
                },
            });

            if (!cartItem) {
                return res.status(404).json({ error: "Item not found." });
            }

            const newQty = quantity;

            if (newQty <= 0) {
                await prisma.cartItem.delete({
                    where: { id: cartItem.id },
                });
            } else {
                await prisma.cartItem.update({
                    where: { id: cartItem.id },
                    data: { quantity: newQty },
                });
            }

            const updatedCart = await prisma.cart.findUnique({
                where: { id: cart.id },
                include: {
                    items: {
                        include: { product: true },
                    },
                },
            });

            const itemsWithDiscount = await CartController.applyPromotionsToCartItems(updatedCart?.items || []);

            return res.status(200).json({
                ...updatedCart,
                items: itemsWithDiscount
            });
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    // ==========================================
    // DELETE - Delete a product from cart
    // ==========================================
    static async removeItem(req: Request, res: Response) {
        try {
            const { nick, productId } = req.body;

            if (!nick || !productId) {
                return res.status(400).json({ error: "Nick and Product ID are required." });
            }

            const playerNick = nick as string;

            const cart = await prisma.cart.findUnique({
                where: { nick: playerNick },
            });

            if (!cart) {
                return res.status(404).json({ error: "Cart not found." });
            }

            const cartItem = await prisma.cartItem.findFirst({
                where: {
                    cartId: cart.id,
                    productId: productId,
                },
            });

            if (!cartItem) {
                return res.status(404).json({ error: "Item not found on cart." });
            }

            await prisma.cartItem.delete({
                where: { id: cartItem.id },
            });

            const updatedCart = await prisma.cart.findUnique({
                where: { id: cart.id },
                include: {
                    items: {
                        include: { product: true },
                    },
                },
            });

            const itemsWithDiscount = await CartController.applyPromotionsToCartItems(updatedCart?.items || []);

            return res.status(200).json({
                ...updatedCart,
                items: itemsWithDiscount
            });
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    // ==========================================
    // DELETE - Clear a player's cart
    // ==========================================
    static async clearCart(req: Request, res: Response) {
        try {
            const nick = req.params.nick as string;

            const cart = await prisma.cart.findUnique({
                where: { nick },
            });

            if (!cart) {
                return res.status(404).json({ error: "Cart not found." });
            }

            await prisma.cart.delete({
                where: { id: cart.id },
            });

            return res.status(200).json({ message: "Cart cleared with success." });
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }
}