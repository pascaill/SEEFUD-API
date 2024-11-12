import express from "express";
import {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getAllProduct,
} from "../controllers/productController.mjs";

import { authenticateToken } from "../middleware/authMiddleware.mjs";

const router = express.Router();

router.get("/product", getAllProduct);
router.post("/product", authenticateToken, createProduct);
router.get("/product/:id", getProduct);
router.put("/product/:id", authenticateToken, updateProduct);
router.delete("/product/:id", authenticateToken, deleteProduct);

export default router;
