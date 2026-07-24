import { z } from 'zod';

export const verifyUserSchema = z.object({
    body: z.object({
        nick: z.string({
            message: 'O nick é obrigatório.'
        })
            .min(3, 'O nick deve ter pelo menos 3 caracteres.')
            .max(16, 'O nick não pode ter mais de 16 caracteres.')
            .trim()
            .regex(/^[a-zA-Z0-9_]+$/, 'O nick contém caracteres inválidos. Use apenas letras, números e underline (_).'),
    })
});