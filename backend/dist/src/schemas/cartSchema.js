"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearCartSchema = exports.removeItemSchema = exports.updateItemQuantitySchema = exports.addItemSchema = exports.getCartSchema = void 0;
const zod_1 = require("zod");
const userSchema_1 = require("./userSchema");
const mcNickSchema = userSchema_1.verifyUserSchema.shape.body.shape.nick;
exports.getCartSchema = zod_1.z.object({
    params: zod_1.z.object({
        nick: mcNickSchema,
    }),
});
exports.addItemSchema = zod_1.z.object({
    body: zod_1.z.object({
        nick: mcNickSchema,
        productId: zod_1.z.string().uuid("ID do produto inválido (deve ser UUID)."),
        quantity: zod_1.z.number().int().min(1, "A quantidade mínima para adicionar é 1.").optional(),
    }),
});
exports.updateItemQuantitySchema = zod_1.z.object({
    body: zod_1.z.object({
        nick: mcNickSchema,
        productId: zod_1.z.string().uuid("ID do produto inválido (deve ser UUID)."),
        quantity: zod_1.z.number().int("A quantidade deve ser um número inteiro."),
    }),
});
exports.removeItemSchema = zod_1.z.object({
    body: zod_1.z.object({
        nick: mcNickSchema,
        productId: zod_1.z.string().uuid("ID do produto inválido (deve ser UUID)."),
    }),
});
exports.clearCartSchema = zod_1.z.object({
    params: zod_1.z.object({
        nick: mcNickSchema,
    }),
});
//# sourceMappingURL=cartSchema.js.map