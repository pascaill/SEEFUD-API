import express from "express";
import {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  createProductWithIngredients,
  getAllProducts,
} from "../../controllers/productController.mjs";

import { authenticateToken } from "../../middleware/authMiddleware.mjs";

const router = express.Router();

router.get("/product", authenticateToken, getAllProducts);
router.post("/product", authenticateToken, createProduct);
router.post(
  "/productAndIngredients",
  authenticateToken,
  createProductWithIngredients
);
router.get("/product/:id", authenticateToken, getProduct);
router.put("/product/:id", authenticateToken, updateProduct);
router.delete("/product/:id", authenticateToken, deleteProduct);

export default router;
