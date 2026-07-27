"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCardPaymentSchema = exports.createPixPaymentSchema = void 0;
const zod_1 = require("zod");
exports.createPixPaymentSchema = zod_1.z.object({
    body: zod_1.z.object({
        nick: zod_1.z.string({
            message: "O nick do jogador é obrigatório.",
        }).min(3, "O nick deve ter pelo menos 3 caracteres.").max(16, "O nick excede o limite do Minecraft."),
        firstName: zod_1.z.string({
            message: "O primeiro nome é obrigatório.",
        }).min(2, "O nome deve ter no mínimo 2 letras.")
            .max(50, "O nome é muito longo."),
        lastName: zod_1.z.string({
            message: "O sobrenome é obrigatório.",
        }).min(2, "O sobrenome deve ter no mínimo 2 letras.")
            .max(50, "O sobrenome é muito longo."),
        email: zod_1.z.string({
            message: "O e-mail é obrigatório.",
        }).email("Forneça um endereço de e-mail válido."),
        cpf: zod_1.z.string({
            message: "O CPF é obrigatório.",
        }).regex(/(^\d{3}\.\d{3}\.\d{3}\-\d{2}$)|(^\d{11}$)/, "Formato de CPF inválido. Digite 11 números com ou sem pontuação.")
    })
});
exports.createCardPaymentSchema = zod_1.z.object({
    body: zod_1.z.object({
        nick: zod_1.z.string({ message: "O nick é obrigatório." })
            .min(3, "Nick inválido.")
            .max(16, "Nick inválido.")
    })
});
//# sourceMappingURL=paymentSchema.js.map