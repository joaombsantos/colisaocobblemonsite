import { z } from "zod";
export declare const getCartSchema: z.ZodObject<{
    params: z.ZodObject<{
        nick: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const addItemSchema: z.ZodObject<{
    body: z.ZodObject<{
        nick: z.ZodString;
        productId: z.ZodString;
        quantity: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const updateItemQuantitySchema: z.ZodObject<{
    body: z.ZodObject<{
        nick: z.ZodString;
        productId: z.ZodString;
        quantity: z.ZodNumber;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const removeItemSchema: z.ZodObject<{
    body: z.ZodObject<{
        nick: z.ZodString;
        productId: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const clearCartSchema: z.ZodObject<{
    params: z.ZodObject<{
        nick: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
//# sourceMappingURL=cartSchema.d.ts.map