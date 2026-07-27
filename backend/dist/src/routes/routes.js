"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productSchema_1 = require("../schemas/productSchema");
const ProductController_1 = require("../controllers/ProductController");
const validateResource_1 = require("../middlewares/validateResource");
const UserController_1 = require("../controllers/UserController");
const userSchema_1 = require("../schemas/userSchema");
const cartSchema_1 = require("../schemas/cartSchema");
const paymentSchema_1 = require("../schemas/paymentSchema"); // <-- Importe os schemas
const CartController_1 = require("../controllers/CartController");
const PaymentController_1 = require("../controllers/PaymentController");
const verifyApiKey_1 = require("../middlewares/verifyApiKey");
const DeliveryController_1 = require("../controllers/DeliveryController");
const router = (0, express_1.Router)();
router.post('/api/users/verify', (0, validateResource_1.validateSchema)(userSchema_1.verifyUserSchema), UserController_1.UserController.verifyNick);
// Product routes
router.post('/api/products', verifyApiKey_1.verifyApiKey, (0, validateResource_1.validateSchema)(productSchema_1.createProductSchema), ProductController_1.ProductController.createProduct);
router.get('/api/products', ProductController_1.ProductController.getAllProducts);
router.get('/api/products/:id', ProductController_1.ProductController.getProductById);
router.get('/api/products/category/:category', ProductController_1.ProductController.getProductsByCategory);
router.put('/api/products/:id', verifyApiKey_1.verifyApiKey, (0, validateResource_1.validateSchema)(productSchema_1.updateProductSchema), ProductController_1.ProductController.updateProduct);
router.delete('/api/products/:id', verifyApiKey_1.verifyApiKey, ProductController_1.ProductController.deleteProduct);
// Cart routes
router.get("/api/cart/:nick", (0, validateResource_1.validateSchema)(cartSchema_1.getCartSchema), CartController_1.CartController.getCart);
router.post("/api/cart/add", (0, validateResource_1.validateSchema)(cartSchema_1.addItemSchema), CartController_1.CartController.addItem);
router.put("/api/cart/update-item", (0, validateResource_1.validateSchema)(cartSchema_1.updateItemQuantitySchema), CartController_1.CartController.updateItemQuantity);
router.delete("/api/cart/remove-item", (0, validateResource_1.validateSchema)(cartSchema_1.removeItemSchema), CartController_1.CartController.removeItem);
router.delete("/api/cart/clear/:nick", (0, validateResource_1.validateSchema)(cartSchema_1.clearCartSchema), CartController_1.CartController.clearCart);
// Payment
router.post("/api/webhooks/payment", PaymentController_1.PaymentController.handleWebhook);
router.post("/api/checkout/pix", (0, validateResource_1.validateSchema)(paymentSchema_1.createPixPaymentSchema), PaymentController_1.PaymentController.createPixPayment);
router.post("/api/checkout/card", (0, validateResource_1.validateSchema)(paymentSchema_1.createCardPaymentSchema), PaymentController_1.PaymentController.createCardPreference);
// Commands
router.get("/api/commands", verifyApiKey_1.verifyApiKey, DeliveryController_1.DeliveryController.getPendingCommands);
router.get("/api/commands/bulk", DeliveryController_1.DeliveryController.getBulkPendingCommands);
router.post("/api/commands/confirm", verifyApiKey_1.verifyApiKey, DeliveryController_1.DeliveryController.completeDelivery);
exports.default = router;
//# sourceMappingURL=routes.js.map