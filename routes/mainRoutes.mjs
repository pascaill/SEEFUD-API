import express from "express";
import authRoutes from "./authRoutes.mjs";
import vendorRoutes from "./vendorRoutes.mjs";
import productRoutes from "./productRoutes.mjs";
import feedbackRoutes from "./feedbackRoutes.mjs";

const router = express.Router();

// Gabungkan semua rute
router.use(authRoutes);
router.use(vendorRoutes);
router.use(productRoutes);
router.use(feedbackRoutes);

export default router;
