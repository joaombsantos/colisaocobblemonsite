import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

export const validateSchema = (schema: z.ZodTypeAny) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params,
            });
            return next();
        } catch (error: any) {
            if (error instanceof ZodError) {
                const zodErrors = (error as any).errors || (error as any).issues;

                const formattedErrors = zodErrors.map((err: any) => ({
                    field: err.path.join('.'),
                    message: err.message,
                }));

                return res.status(400).json({
                    message: "Erro de validação dos dados.",
                    errors: formattedErrors
                });
            }
            return res.status(500).json({ message: "Erro interno na validação." });
        }
    };