import { z } from "zod";
import { verifyUserSchema } from "./userSchema";

const mcNickSchema = verifyUserSchema.shape.body.shape.nick;

export const getCartSchema = z.object({
    params: z.object({
        nick: mcNickSchema,
    }),
});

export const addItemSchema = z.object({
    body: z.object({
        nick: mcNickSchema,
        productId: z.string().uuid("ID do produto inválido (deve ser UUID)."),
        quantity: z.number().int().min(1, "A quantidade mínima para adicionar é 1.").optional(),
    }),
});

export const updateItemQuantitySchema = z.object({
    body: z.object({
        nick: mcNickSchema,
        productId: z.string().uuid("ID do produto inválido (deve ser UUID)."),
        quantity: z.number().int("A quantidade deve ser um número inteiro."),
    }),
});

export const removeItemSchema = z.object({
    body: z.object({
        nick: mcNickSchema,
        productId: z.string().uuid("ID do produto inválido (deve ser UUID)."),
    }),
});

export const clearCartSchema = z.object({
    params: z.object({
        nick: mcNickSchema,
    }),
});