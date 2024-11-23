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

router.get("/ingredient", authenticateToken, getAllIngredients);
router.post("/ingredient", authenticateToken, createIngredient);
router.get("/ingredient/:id", authenticateToken, getIngredient);
router.put("/ingredient/:id", authenticateToken, updateIngredient);
router.delete("/ingredient/:id", authenticateToken, deleteIngredient);

export default router;
