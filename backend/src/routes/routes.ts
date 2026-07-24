import { Router } from "express";
import { createProductSchema, updateProductSchema } from "../schemas/productSchema";
import { ProductController } from "../controllers/ProductController";
import { validateSchema } from "../middlewares/validateResource";
import { UserController } from "../controllers/UserController";
import { verifyUserSchema } from "../schemas/userSchema";
import { getCartSchema, addItemSchema, updateItemQuantitySchema, removeItemSchema, clearCartSchema } from "../schemas/cartSchema";
import { createPixPaymentSchema, createCardPaymentSchema } from "../schemas/paymentSchema"; // <-- Importe os schemas
import { CartController } from "../controllers/CartController";
import { PaymentController } from "../controllers/PaymentController";
import { verifyApiKey } from "../middlewares/verifyApiKey";
import { DeliveryController } from "../controllers/DeliveryController";

const router: Router = Router();

router.post('/api/users/verify', validateSchema(verifyUserSchema), UserController.verifyNick);

// Product routes
router.post('/api/products', verifyApiKey, validateSchema(createProductSchema), ProductController.createProduct);
router.get('/api/products', ProductController.getAllProducts);
router.get('/api/products/:id', ProductController.getProductById);
router.get('/api/products/category/:category', ProductController.getProductsByCategory);
router.put('/api/products/:id', verifyApiKey, validateSchema(updateProductSchema), ProductController.updateProduct);
router.delete('/api/products/:id', verifyApiKey, ProductController.deleteProduct);

// Cart routes
router.get("/api/cart/:nick", validateSchema(getCartSchema), CartController.getCart);
router.post("/api/cart/add", validateSchema(addItemSchema), CartController.addItem);
router.put("/api/cart/update-item", validateSchema(updateItemQuantitySchema), CartController.updateItemQuantity);
router.delete("/api/cart/remove-item", validateSchema(removeItemSchema), CartController.removeItem);
router.delete("/api/cart/clear/:nick", validateSchema(clearCartSchema), CartController.clearCart);

// Payment
router.post("/api/webhooks/payment", PaymentController.handleWebhook);
router.post("/api/checkout/pix", validateSchema(createPixPaymentSchema), PaymentController.createPixPayment);
router.post("/api/checkout/card", validateSchema(createCardPaymentSchema), PaymentController.createCardPreference);

// Commands
router.get("/api/commands", verifyApiKey, DeliveryController.getPendingCommands);
router.get("/api/commands/bulk", DeliveryController.getBulkPendingCommands);
router.post("/api/commands/confirm", verifyApiKey, DeliveryController.completeDelivery);

export default router;