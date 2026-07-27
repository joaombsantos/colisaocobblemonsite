import { Request, Response } from "express";
export declare class PaymentController {
    private static getMpClient;
    private static calculateCartTotal;
    static createPixPayment(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static createCardPreference(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    private static processingPayments;
    static handleWebhook(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=PaymentController.d.ts.map