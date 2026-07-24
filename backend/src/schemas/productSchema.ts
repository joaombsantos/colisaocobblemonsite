import { z } from 'zod';

const ServerTypeEnum = z.enum(['KANTO', 'KANTO_PLUS', 'SURVIVAL'], {
    message: 'Servidor inválido. Opções válidas: KANTO, KANTO_PLUS, SURVIVAL.'
});

const ProductCategoryEnum = z.enum(['VIPS', 'CAIXAS', 'PASSES'], {
    message: 'Categoria inválida. Opções válidas: VIPS, CAIXAS, PASSES.'
});

const forbiddenCommands = /^\/?(op|deop|gamemode|gm|stop|ban|ban-ip|pardon|kill|execute|luckperms)\b/i;

export const createProductSchema = z.object({
    body: z.object({
        productName: z.string({
            message: 'O nome do produto é obrigatório.',
        }).min(3, 'O nome do produto deve ter pelo menos 3 caracteres.'),

        photoUrl: z.string({
            message: 'O caminho ou URL da foto é obrigatório.',
        }),

        price: z.number({
            message: 'O preço é obrigatório.',
        }).positive('O preço deve ser maior que zero.'),

        server: ServerTypeEnum,
        category: ProductCategoryEnum,

        description: z.string().optional(),
        descriptionImage: z.string().optional(),
        
        command: z.string()
            .min(1, "O comando é obrigatório.")
            .refine(
                (cmd) => !forbiddenCommands.test(cmd.trim()),
                { message: "Comando não permitido por questões de segurança." }
            ),
        
        requireOnline: z.boolean().optional(),
    })
});

export const updateProductSchema = z.object({
    body: createProductSchema.shape.body.partial()
});