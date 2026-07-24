import nodemailer from "nodemailer";

export class EmailService {
    private static transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    static async sendPurchaseNotification(nick: string, total: number, items: any[]) {
        try {
            const itemsList = items
                .map(item => `${item.quantity}x ${item.product.productName} (${item.product.server})`)
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