"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductSchema = exports.createProductSchema = void 0;
const zod_1 = require("zod");
const ServerTypeEnum = zod_1.z.enum(['KANTO', 'KANTO_PLUS', 'SURVIVAL'], {
    message: 'Servidor inválido. Opções válidas: KANTO, KANTO_PLUS, SURVIVAL.'
});
const ProductCategoryEnum = zod_1.z.enum(['VIPS', 'CAIXAS', 'PASSES'], {
    message: 'Categoria inválida. Opções válidas: VIPS, CAIXAS, PASSES.'
});
const forbiddenCommands = /^\/?(op|deop|gamemode|gm|stop|ban|ban-ip|pardon|kill|execute|luckperms)\b/i;
exports.createProductSchema = zod_1.z.object({
    body: zod_1.z.object({
        productName: zod_1.z.string({
            message: 'O nome do produto é obrigatório.',
        }).min(3, 'O nome do produto deve ter pelo menos 3 caracteres.'),
        photoUrl: zod_1.z.string({
            message: 'O caminho ou URL da foto é obrigatório.',
        }),
        price: zod_1.z.number({
            message: 'O preço é obrigatório.',
        }).positive('O preço deve ser maior que zero.'),
        server: ServerTypeEnum,
        category: ProductCategoryEnum,
        description: zod_1.z.string().optional(),
        descriptionImage: zod_1.z.string().optional(),
        command: zod_1.z.string()
            .min(1, "O comando é obrigatório.")
            .refine((cmd) => !forbiddenCommands.test(cmd.trim()), { message: "Comando não permitido por questões de segurança." }),
        requireOnline: zod_1.z.boolean().optional(),
    })
});
exports.updateProductSchema = zod_1.z.object({
    body: exports.createProductSchema.shape.body.partial()
});
//# sourceMappingURL=productSchema.js.map