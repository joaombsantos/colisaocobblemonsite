"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUserSchema = void 0;
const zod_1 = require("zod");
exports.verifyUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        nick: zod_1.z.string({
            message: 'O nick é obrigatório.'
        })
            .min(3, 'O nick deve ter pelo menos 3 caracteres.')
            .max(16, 'O nick não pode ter mais de 16 caracteres.')
            .trim()
            .regex(/^[a-zA-Z0-9_]+$/, 'O nick contém caracteres inválidos. Use apenas letras, números e underline (_).'),
    })
});
//# sourceMappingURL=userSchema.js.map