import { z } from 'zod';

export const promotionSchema = z.object({
    body: z.object({
        category: z.string("A categoria é obrigatória.")
            .min(1, "A categoria é obrigatória.")
            .transform(val => val.toLowerCase())
            .refine(val => ['vips', 'caixas', 'passes', 'all'].includes(val), {
                message: "Categoria inválida. Use: vips, caixas, passes ou all."
            }),

        discount: z.coerce.number("O desconto é obrigatório e deve ser um número.")
            .refine(val => val > 0 && val <= 100, {
                message: "O desconto deve ser um número válido entre 1 e 100."
            }),

        time_days: z.coerce.number("dias deve ser um número.")
            .int("dias deve ser um número inteiro.")
            .nonnegative("dias deve ser um número maior ou igual a 0."),

        time_hours: z.coerce.number("horas deve ser um número.")
            .int("horas deve ser um número inteiro.")
            .nonnegative("horas deve ser um número maior ou igual a 0."),

        time_minutes: z.coerce.number("minutos deve ser um número.")
            .int("minutos deve ser um número inteiro.")
            .nonnegative("minutos deve ser um número maior ou igual a 0.")
            .default(0),
    })
});