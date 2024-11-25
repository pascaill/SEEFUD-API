import express from "express";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
<<<<<<< HEAD:routes/productRoutes.mjs
} from "../controllers/productController.mjs";
import { authenticateToken } from "../middlewares/authMiddleware.mjs";
import { isVendor } from "../middlewares/roleMiddleware.mjs";

const router = express.Router();

// Routes
router.get("/:vendorId/products", getAllProducts); // Public access for users
router.post("/products", authenticateToken, isVendor, createProduct); // Vendor only
router.patch("/products/:id", authenticateToken, isVendor, updateProduct); // Vendor only
router.delete("/products/:id", authenticateToken, isVendor, deleteProduct); // Vendor only
=======
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
>>>>>>> aec1e0bcfd73b038b0bf61f8a659fd10040a8815:routes/all/productRoutes.mjs

export default router;
