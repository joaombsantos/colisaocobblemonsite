"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const prisma_1 = require("../config/prisma");
class ProductController {
    // ==========================================
    // CREATE - Create a new product
    // ==========================================
    static async createProduct(req, res) {
        try {
            const { productName, photoUrl, price, server, category, description, descriptionImage, command, requireOnline } = req.body;
            const newProduct = await prisma_1.prisma.product.create({
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
            });
            return res.status(201).json(newProduct);
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    // ==========================================
    // READ - List all products
    // ==========================================
    static async getAllProducts(req, res) {
        try {
            const products = await prisma_1.prisma.product.findMany();
            return res.status(200).json(products);
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    // ==========================================
    // READ - Search product by ID
    // ==========================================
    static async getProductById(req, res) {
        try {
            const { id } = req.params;
            const product = await prisma_1.prisma.product.findUnique({
                where: { id }
            });
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            return res.status(200).json(product);
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    // ==========================================
    // READ - Search products by category
    // ==========================================
    static async getProductsByCategory(req, res) {
        try {
            const { category } = req.params;
            const { server } = req.query;
            const filter = { category };
            if (server) {
                filter.server = server;
            }
            const products = await prisma_1.prisma.product.findMany({
                where: filter,
                orderBy: {
                    price: 'asc'
                }
            });
            if (!products) {
                return res.status(404).json({ message: 'Products not found' });
            }
            return res.status(200).json(products);
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    // ==========================================
    // UPDATE - Update product
    // ==========================================
    static async updateProduct(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;
            const updatedProduct = await prisma_1.prisma.product.update({
                where: { id },
                data: data
            });
            return res.status(200).json(updatedProduct);
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    // ==========================================
    // DELETE - Delete a product
    // ==========================================
    static async deleteProduct(req, res) {
        try {
            const { id } = req.params;
            await prisma_1.prisma.product.delete({
                where: { id }
            });
            return res.status(204).send();
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}
exports.ProductController = ProductController;
//# sourceMappingURL=ProductController.js.map