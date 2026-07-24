import { Request, Response } from 'express';
import { ProductCategory, ServerType } from "@prisma/client";
import { prisma } from "../config/prisma";

export class ProductController {

    // ==========================================
    // CREATE - Create a new product
    // ==========================================
    static async createProduct(req: Request, res: Response) {
        try {
            const { productName, photoUrl, price, server, category, description, descriptionImage, command, requireOnline } = req.body;

            const newProduct = await prisma.product.create({
                data: {
                    productName,
                    photoUrl,
                    price,
                    server,
                    category,
                    description,
                    descriptionImage,
                    command,
                    requireOnline
                }
            })

            return res.status(201).json(newProduct);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    // ==========================================
    // READ - List all products
    // ==========================================
    static async getAllProducts(req: Request, res: Response) {
        try {
            const products = await prisma.product.findMany();

            return res.status(200).json(products);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    // ==========================================
    // READ - Search product by ID
    // ==========================================
    static async getProductById(req: Request, res: Response) {
        try {
            const { id } = req.params as { id: string };

            const product = await prisma.product.findUnique({
                where: { id }
            });

            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }

            return res.status(200).json(product);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    // ==========================================
    // READ - Search products by category
    // ==========================================
    static async getProductsByCategory(req: Request, res: Response) {
        try {
            const { category } = req.params as { category: ProductCategory };

            const { server } = req.query;

            const filter: any = { category };
            if (server) {
                filter.server = server as ServerType;
            }

            const products = await prisma.product.findMany({
                where: filter,
                orderBy: {
                    price: 'asc'
                }
            });

            if (!products) {
                return res.status(404).json({ message: 'Products not found' });
            }

            return res.status(200).json(products);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    // ==========================================
    // UPDATE - Update product
    // ==========================================
    static async updateProduct(req: Request, res: Response) {
        try {
            const { id } = req.params as { id: string };
            const data = req.body;

            const updatedProduct = await prisma.product.update({
                where: { id },
                data: data
            });

            return res.status(200).json(updatedProduct);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    // ==========================================
    // DELETE - Delete a product
    // ==========================================
    static async deleteProduct(req: Request, res: Response) {
        try {
            const { id } = req.params as { id: string };

            await prisma.product.delete({
                where: { id }
            });

            return res.status(204).send();
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }
}