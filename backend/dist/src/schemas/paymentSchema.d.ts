import { z } from "zod";
export declare const createPixPaymentSchema: z.ZodObject<{
    body: z.ZodObject<{
        nick: z.ZodString;
        firstName: z.ZodString;
        lastName: z.ZodString;
        email: z.ZodString;
        cpf: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const createCardPaymentSchema: z.ZodObject<{
    body: z.ZodObject<{
        nick: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
//# sourceMappingURL=paymentSchema.d.ts.map