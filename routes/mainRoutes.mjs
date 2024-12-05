import express from "express";

import authRoutes from "./all/authRoutes.mjs";
import vendorRoutes from "./all/vendorRoutes.mjs";
import productRoutes from "./all/productRoutes.mjs";
import feedbackRoutes from "./all/feedbackRoutes.mjs";
import adminAuthRoutes from "./all/adminAuthRoutes.mjs";
import adminRoutes from "./all/adminRoutes.mjs";
import ingredientRoutes from "./all/ingredientsRoutes.mjs";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "success" });
});

router.use("/auth", authRoutes);
router.use("/vendor", vendorRoutes);
router.use("/products", productRoutes);
router.use("/feedback", feedbackRoutes);
router.use("/admin", adminRoutes);
router.use("/admin/auth", adminAuthRoutes);
router.use("/ingredients", ingredientRoutes);

export default router;
