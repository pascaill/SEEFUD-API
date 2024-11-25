import express from "express";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.mjs";
import { authenticateToken } from "../middlewares/authMiddleware.mjs";
import { isVendor } from "../middlewares/roleMiddleware.mjs";

const router = express.Router();

// Routes
router.get("/:vendorId/products", getAllProducts); // Public access for users
router.post("/products", authenticateToken, isVendor, createProduct); // Vendor only
router.patch("/products/:id", authenticateToken, isVendor, updateProduct); // Vendor only
router.delete("/products/:id", authenticateToken, isVendor, deleteProduct); // Vendor only

export default router;
