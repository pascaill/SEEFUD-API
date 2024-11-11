import express from "express";
import {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.mjs";

import { authenticateToken } from "../middleware/authMiddleware.mjs";

const router = express.Router();

router.post("/product", authenticateToken, createProduct);
router.get("/product/:id", authenticateToken, getProduct);
router.put("/product/:id", authenticateToken, updateProduct);
router.delete("/product/:id", authenticateToken, deleteProduct);

export default router;
