import multer from "multer";
import path from "path";
import fs from "fs/promises";
import db from "../connection/connection.mjs";

// Konfigurasi multer untuk upload gambar
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(process.cwd(), "public/images/ingredients");
    cb(null, uploadPath); // Direktori penyimpanan
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Nama file unik
  },
});

// Filter file untuk hanya menerima gambar
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

// Middleware upload file
const upload = multer({ storage, fileFilter });

// Fungsi untuk mendapatkan semua bahan (ingredients)
export const getAllIngredients = async (req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM ingredients");
    return res.status(200).json({
      status: "success",
      message: "Ingredients retrieved successfully",
      data: results,
    });
  } catch (error) {
    console.error("Get ingredients error:", error);
    return res.status(500).json({
      status: "failed",
      message: "Failed to retrieve ingredients",
      error: error.message,
    });
  }
};

export const createIngredient = [
  upload.single("image"), // Middleware untuk upload file
  async (req, res) => {
    const { name, description, qty, unit } = req.body;
    const image = req.file ? req.file.filename : null; // Path gambar

    if (!name || !qty || !unit) {
      return res.status(400).json({
        status: "failed",
        message: "Please provide name, qty, and unit",
      });
    }

    try {
      const [result] = await db.query(
        "INSERT INTO ingredients (name, description, image, qty, unit) VALUES (?, ?, ?, ?, ?)",
        [name, description, image, qty, unit]
      );

      return res.status(201).json({
        status: "success",
        message: "Ingredient created",
        data: {
          id: result.insertId,
          name,
          description,
          image,
          qty,
          unit,
        },
      });
    } catch (error) {
      console.error("Create ingredient error:", error);
      return res.status(500).json({
        status: "failed",
        message: "Failed to create ingredient",
        error: error.message,
      });
    }
  },
];

// Fungsi untuk mendapatkan detail bahan (ingredient)
export const getIngredient = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.query("SELECT * FROM ingredients WHERE id = ?", [
      id,
    ]);

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ status: "failed", message: "Ingredient not found" });
    }

    return res.status(200).json({
      status: "success",
      data: rows[0],
    });
  } catch (error) {
    console.error("Get ingredient error:", error);
    return res.status(500).json({
      status: "failed",
      message: "Failed to retrieve ingredient",
      error: error.message,
    });
  }
};

// Fungsi untuk memperbarui bahan (ingredient)
export const updateIngredient = [
  upload.single("image"), // Middleware untuk upload file
  async (req, res) => {
    const { id } = req.params;
    const { name, description, qty, unit } = req.body;
    const image = req.file ? `/images/ingredients/${req.file.filename}` : null; // Path gambar

    if (!name && !description && !qty && !unit && !image) {
      return res.status(400).json({
        status: "failed",
        message: "Please provide data to update",
      });
    }

    try {
      // Ambil gambar lama untuk dihapus jika ada gambar baru
      if (image) {
        const [rows] = await db.query(
          "SELECT image FROM ingredients WHERE id = ?",
          [id]
        );
        if (rows.length > 0 && rows[0].image) {
          const oldImagePath = path.join(
            process.cwd(),
            "public",
            rows[0].image
          );
          await fs
            .unlink(oldImagePath)
            .catch((err) => console.error("Failed to delete old image:", err));
        }
      }

      // Update ingredient
      const [result] = await db.query(
        `UPDATE ingredients SET 
            name = COALESCE(?, name), 
            description = COALESCE(?, description), 
            image = COALESCE(?, image), 
            qty = COALESCE(?, qty), 
            unit = COALESCE(?, unit) 
          WHERE id = ?`,
        [name, description, image, qty, unit, id]
      );

      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ status: "failed", message: "Ingredient not found" });
      }

      return res.status(200).json({
        status: "success",
        message: "Ingredient updated successfully",
      });
    } catch (error) {
      console.error("Update ingredient error:", error);
      return res.status(500).json({
        status: "failed",
        message: "Failed to update ingredient",
        error: error.message,
      });
    }
  },
];

// Fungsi untuk menghapus bahan (ingredient)
export const deleteIngredient = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query("DELETE FROM ingredients WHERE id = ?", [
      id,
    ]);

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ status: "failed", message: "Ingredient not found" });
    }

    return res.status(200).json({
      status: "success",
      message: "Ingredient deleted successfully",
    });
  } catch (error) {
    console.error("Delete ingredient error:", error);
    return res.status(500).json({
      status: "failed",
      message: "Failed to delete ingredient",
      error: error.message,
    });
  }
};
