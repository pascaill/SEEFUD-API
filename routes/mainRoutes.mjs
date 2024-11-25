import express from "express";

import authRoutes from "./all/authRoutes.mjs";
import vendorRoutes from "./all/vendorRoutes.mjs";
import productRoutes from "./all/productRoutes.mjs";
import feedbackRoutes from "./all/feedbackRoutes.mjs";
import adminAuthRoutes from "./all/adminAuthRoutes.mjs";
import adminRoutes from "./all/adminRoutes.mjs";
import ingredientRoutes from "./all/ingredientsRoutes.mjs";

const router = express.Router();

// router.use({
//   authRoutes,
//   vendorRoutes,
//   productRoutes,
//   feedbackRoutes,
//   adminAuthRoutes,
//   adminRoutes,
//   ingredientRoutes,
// });

router.use(authRoutes);
router.use(vendorRoutes);
router.use(productRoutes);
router.use(feedbackRoutes);
router.use(adminRoutes);
router.use(adminAuthRoutes);
router.use(ingredientRoutes);

export default router;
