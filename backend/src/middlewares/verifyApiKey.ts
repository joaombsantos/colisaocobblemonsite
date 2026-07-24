import { Request, Response, NextFunction } from "express";

export const verifyApiKey = (req: Request, res: Response, next: NextFunction) => {
    const apiKey = req.headers["x-api-key"];
    const envKey = process.env.ADMIN_API_KEY;

    if (!apiKey || apiKey !== envKey) {
        return res.status(401).json({ 
            error: "Acess denied. Requisition not authorized." 
        });
    }

    return next();
};