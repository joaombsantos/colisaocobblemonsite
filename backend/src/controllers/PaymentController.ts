import { Request, Response } from "express";
import { CommandService } from "../services/CommandService";
import { MercadoPagoConfig, Payment, Preference } from 'mercadopago';
import { prisma } from "../config/prisma";
import { EmailService } from "../services/EmailService";

export class PaymentController {

    private static getMpClient() {
        const token = process.env.MP_ACCESS_TOKEN;

        if (!token) {
            console.error("[ERRO CRÍTICO] MP_ACCESS_TOKEN não foi encontrado no arquivo .env!");
            throw new Error("Configuração de pagamento ausente.");
        }

        return new MercadoPagoConfig({ accessToken: token });
    }

    private static async calculateCartTotal(nick: string): Promise<number> {
        const cart = await prisma.cart.findUnique({
            where: { nick },
            include: { items: { include: { product: true } } }
        });

        if (!cart) return 0;

        return cart.items.reduce((total, item) => {
            return total + (Number(item.product.price) * item.quantity);
        }, 0);
    }

    static async createPixPayment(req: Request, res: Response) {
        const { nick, firstName, lastName, cpf, email } = req.body;

        try {
            if (!firstName || !lastName || !cpf || !email) {
                return res.status(400).json({ error: "Nome, sobrenome, CPF e E-mail são obrigatórios para transações PIX." });
            }

            const total = await PaymentController.calculateCartTotal(nick);
            if (total <= 0) return res.status(400).json({ error: "Carrinho vazio ou inválido." });

            const payment = new Payment(PaymentController.getMpClient());

            const result = await payment.create({
                body: {
                    transaction_amount: total,
                    description: `Loja Colisão Cobblemon - Pedido de ${nick}`,
                    payment_method_id: 'pix',
                    payer: {
                        email: email,
                        first_name: firstName,
                        last_name: lastName,
                        identification: {
                            type: 'CPF',
                            number: cpf.replace(/\D/g, '')
                        }
                    },
                    metadata: { nick: nick },

                    notification_url: `${process.env.BACKEND_URL}/api/webhooks/payment`
                }
            });

            const qrCodeBase64 = result.point_of_interaction?.transaction_data?.qr_code_base64;
            const qrCodeText = result.point_of_interaction?.transaction_data?.qr_code;

            return res.status(200).json({
                qrCodeBase64,
                qrCodeText,
                paymentId: result.id
            });
        } catch (error: any) {
            console.error("[MP] Erro ao gerar PIX:", error.message || error);
            return res.status(500).json({ error: "Erro ao gerar pagamento via PIX." });
        }
    }

    static async createCardPreference(req: Request, res: Response) {
        const { nick } = req.body;

        try {
            const total = await PaymentController.calculateCartTotal(nick);
            if (total <= 0) return res.status(400).json({ error: "Carrinho vazio ou inválido." });

            const preference = new Preference(PaymentController.getMpClient());
            const result = await preference.create({
                body: {
                    items: [
                        {
                            id: "colisao_cart",
                            title: `Pedido de ${nick}`,
                            quantity: 1,
                            unit_price: total
                        }
                    ],
                    external_reference: nick,
                    notification_url: `${process.env.BACKEND_URL}/api/webhooks/payment`
                }
            });

            return res.status(200).json({ url: result.init_point });
        } catch (error) {
            console.error("[MP] Erro ao gerar Link:", error);
            return res.status(500).json({ error: "Erro ao gerar link de pagamento." });
        }
    }

    // ==========================================
    // POST - Confirms if a payment was approved
    // ==========================================
    private static processingPayments = new Set<string>();

    static async handleWebhook(req: Request, res: Response) {
        console.log("\n[WEBHOOK] 🔔 Bateu uma requisição do Mercado Pago!");
        
        const topic = req.query?.topic || req.body?.type;
        if (topic === "merchant_order") {
            console.log("[WEBHOOK] Ignorando aviso de merchant_order.");
            return res.status(200).send("Ignorado.");
        }

        const paymentId = req.body?.data?.id || req.query?.['data.id'] || req.query?.id;

        if (!paymentId) {
            console.log("[WEBHOOK] ❌ Nenhum ID de pagamento encontrado.");
            return res.status(200).send("Ignorado: Sem ID");
        }

        const idStr = String(paymentId);
        console.log(`[WEBHOOK] Processando Pagamento ID: ${idStr}`);

        if (PaymentController.processingPayments.has(idStr)) {
            console.log(`[WEBHOOK] ⚠️ Pagamento ${idStr} já está em processamento simultâneo. Ignorando duplicata.`);
            return res.status(200).send("Pagamento já em processamento.");
        }
        
        PaymentController.processingPayments.add(idStr);

        try {
            const paymentClient = new Payment(PaymentController.getMpClient());
            const paymentInfo = await paymentClient.get({ id: paymentId });

            console.log(`[WEBHOOK] Status atual no MP: [ ${paymentInfo.status} ]`);

            if (paymentInfo.status === "approved") {
                const playerNick = paymentInfo.metadata?.nick || paymentInfo.external_reference;

                if (playerNick) {
                    const cart = await prisma.cart.findUnique({
                        where: { nick: playerNick },
                        include: { items: { include: { product: true } } }
                    });

                    if (cart && cart.items.length > 0) {
                        const total = cart.items.reduce((acc, item) => {
                            return acc + (Number(item.product.price) * item.quantity);
                        }, 0);

                        await EmailService.sendPurchaseNotification(playerNick, total, cart.items);
                        console.log(`[PAGAMENTO APROVADO] Entregando itens para: ${playerNick}`);
                        
                        await CommandService.executeCartCommands(playerNick);
                    } else {
                        console.log(`[AVISO] Carrinho já está vazio para: ${playerNick}. Entrega não necessária ou já realizada.`);
                    }
                } else {
                    console.log(`[ERRO] Pagamento aprovado, mas não achei o nick do jogador!`);
                }
            } else {
                console.log(`[WEBHOOK] O status é '${paymentInfo.status}', aguardando aprovação para entregar.`);
            }

            return res.status(200).send("Webhook processado.");

        } catch (error: any) {
            console.error("[WEBHOOK] 🔥 Erro ao processar notificação:", error.message);
            return res.status(500).json({ message: error.message });
        } finally {
            PaymentController.processingPayments.delete(idStr);
        }
    }
}