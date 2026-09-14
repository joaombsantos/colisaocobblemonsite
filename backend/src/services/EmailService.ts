import nodemailer from "nodemailer";
import { PromotionHelper } from "../utils/promotionHelper";

export class EmailService {
    private static transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    static async sendPurchaseNotification(nick: string, items: any[]) {
        try {
            const discountedItems = await PromotionHelper.applyToCartItems(items);
            const total = discountedItems.reduce((acc, item) => acc + (Number(item.product.price) * item.quantity), 0);

            const itemsList = discountedItems
                .map(item => {
                    const priceStr = item.product.hasPromotion 
                        ? `R$${item.product.price.toFixed(2)} (Antigo: R$${item.product.originalPrice.toFixed(2)})` 
                        : `R$${item.product.price.toFixed(2)}`;
                    
                    return `${item.quantity}x ${item.product.productName} - ${priceStr} (${item.product.server})`;
                })
                .join("\n");

            const mailOptions = {
                from: `"Loja Colisão" <${process.env.EMAIL_USER}>`,
                to: "colisaocobblemon@gmail.com",
                subject: `Compra de R$${total.toFixed(2)} feita para ${nick}`,
                text: `${nick} comprou os seguintes produtos:\n\n${itemsList}`
            };

            await this.transporter.sendMail(mailOptions);
            console.log(`[EMAIL] Notificação de compra de ${nick} enviada com sucesso!`);
        } catch (error) {
            console.error("[EMAIL] Erro ao enviar e-mail de notificação:", error);
        }
    }
}