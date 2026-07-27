import { z } from 'zod';
export declare const createProductSchema: z.ZodObject<{
    body: z.ZodObject<{
        productName: z.ZodString;
        photoUrl: z.ZodString;
        price: z.ZodNumber;
        server: z.ZodEnum<{
            KANTO: "KANTO";
            KANTO_PLUS: "KANTO_PLUS";
            SURVIVAL: "SURVIVAL";
        }>;
        category: z.ZodEnum<{
            VIPS: "VIPS";
            CAIXAS: "CAIXAS";
            PASSES: "PASSES";
        }>;
        description: z.ZodOptional<z.ZodString>;
        descriptionImage: z.ZodOptional<z.ZodString>;
        command: z.ZodString;
        requireOnline: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const updateProductSchema: z.ZodObject<{
    body: z.ZodObject<{
        productName: z.ZodOptional<z.ZodString>;
        photoUrl: z.ZodOptional<z.ZodString>;
        price: z.ZodOptional<z.ZodNumber>;
        server: z.ZodOptional<z.ZodEnum<{
            KANTO: "KANTO";
            KANTO_PLUS: "KANTO_PLUS";
            SURVIVAL: "SURVIVAL";
        }>>;
        category: z.ZodOptional<z.ZodEnum<{
            VIPS: "VIPS";
            CAIXAS: "CAIXAS";
            PASSES: "PASSES";
        }>>;
        description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        descriptionImage: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        command: z.ZodOptional<z.ZodString>;
        requireOnline: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    }, z.core.$strip>;
}, z.core.$strip>;
//# sourceMappingURL=productSchema.d.ts.map