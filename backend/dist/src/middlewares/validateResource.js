"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchema = void 0;
const zod_1 = require("zod");
const validateSchema = (schema) => async (req, res, next) => {
    try {
        await schema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        return next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            const zodErrors = error.errors || error.issues;
            const formattedErrors = zodErrors.map((err) => ({
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
exports.validateSchema = validateSchema;
//# sourceMappingURL=validateResource.js.map