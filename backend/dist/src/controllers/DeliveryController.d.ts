import { Request, Response } from "express";
export declare class DeliveryController {
    static getPendingCommands(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static getBulkPendingCommands(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static completeDelivery(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=DeliveryController.d.ts.map