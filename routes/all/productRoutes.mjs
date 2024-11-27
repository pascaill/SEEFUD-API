import express from "express";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../controllers/productController.mjs";
import { authenticateToken } from "../../middleware/authMiddleware.mjs";
import { isVendor } from "../../middleware/roleMiddleware.mjs";

const router = express.Router();

// Routes
router.get("/:vendorId", getAllProducts); // Public access for users
router.post("/", authenticateToken, isVendor, createProduct); // Vendor only
router.patch("//:id", authenticateToken, isVendor, updateProduct); // Vendor only
router.delete("//:id", authenticateToken, isVendor, deleteProduct); // Vendor only

export default router;
