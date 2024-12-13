import express from "express";
import {
  createIngredient,
  getIngredient,
  updateIngredient,
  deleteIngredient,
  getAllIngredients,
} from "../../controllers/ingredientsController.mjs";

import { authenticateToken } from "../../middleware/authMiddleware.mjs";

const router = express.Router();

router.get("/", getAllIngredients);
router.post("/", authenticateToken, createIngredient);
router.get("/:id", getIngredient);
router.put("/:id", authenticateToken, updateIngredient);
router.delete("/:id", authenticateToken, deleteIngredient);

export default router;
