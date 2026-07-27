"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyApiKey = void 0;
const verifyApiKey = (req, res, next) => {
    const apiKey = req.headers["x-api-key"];
    const envKey = process.env.ADMIN_API_KEY;
    if (!apiKey || apiKey !== envKey) {
        return res.status(401).json({
            error: "Acess denied. Requisition not authorized."
        });
    }
    return next();
};
exports.verifyApiKey = verifyApiKey;
//# sourceMappingURL=verifyApiKey.js.map