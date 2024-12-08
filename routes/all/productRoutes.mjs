import express from "express";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  upload,
} from "../../controllers/productController.mjs";
import { authenticateToken } from "../../middleware/authMiddleware.mjs";
import { isVendor } from "../../middleware/roleMiddleware.mjs";

const router = express.Router();

// Routes
router.get("/:vendorId", getAllProducts); // Public access for users
router.post(
  "/",
  authenticateToken,
  isVendor,
  upload.single("image"),
  createProduct
); // Vendor only
router.patch(
  "//:id",
  authenticateToken,
  isVendor,
  upload.single("image"),
  updateProduct
); // Vendor only
router.delete("//:id", authenticateToken, isVendor, deleteProduct); // Vendor only

export default router;
