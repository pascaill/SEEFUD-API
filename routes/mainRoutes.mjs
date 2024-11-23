import express from "express";
import authRoutes from "./all/authRoutes.mjs";
import vendorRoutes from "./all/vendorRoutes.mjs";
import productRoutes from "./all/productRoutes.mjs";
import ingredientRoutes from "./all/ingredientRoutes.mjs";
import feedbackRoutes from "./all/feedbackRoutes.mjs";
import adminAuthRoutes from "./all/adminAuthRoutes.mjs";
import adminRoutes from "./all/adminRoutes.mjs";

const router = express.Router();

router.use({
  authRoutes,
  vendorRoutes,
  productRoutes,
  ingredientRoutes,
  feedbackRoutes,
  adminAuthRoutes,
  adminRoutes,
});

export default router;
