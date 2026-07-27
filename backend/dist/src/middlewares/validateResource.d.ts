import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
export declare const validateSchema: (schema: z.ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
//# sourceMappingURL=validateResource.d.ts.map