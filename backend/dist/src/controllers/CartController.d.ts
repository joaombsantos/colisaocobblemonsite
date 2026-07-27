import { Request, Response } from "express";
export declare class CartController {
    static getCart(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static addItem(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static updateItemQuantity(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static removeItem(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static clearCart(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=CartController.d.ts.map