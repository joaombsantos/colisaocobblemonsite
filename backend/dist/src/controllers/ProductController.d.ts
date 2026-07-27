import { Request, Response } from 'express';
export declare class ProductController {
    static createProduct(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static getAllProducts(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static getProductById(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static getProductsByCategory(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static updateProduct(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static deleteProduct(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=ProductController.d.ts.map