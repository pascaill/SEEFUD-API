import db from "../connection/connection.mjs";
import fs from "fs/promises"; // Modul untuk operasi file secara asinkron
import multer from "multer";
import path from "path";

// Konfigurasi Multer untuk menyimpan gambar
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), "public/images/products")); // Direktori penyimpanan
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

// Fungsi untuk mendapatkan semua produk milik vendor tertentu (dapat diakses oleh semua user)
export const getAllProducts = async (req, res) => {
  const vendor_id = req.user.id; // Ambil ID vendor dari token JWT

  try {
    const [results] = await db.query("SELECT * FROM product WHERE vendor_id = ?", [vendor_id]);

    return res.status(200).json({
      status: "success",
      message: "Product collection retrieved successfully",
      data: results,
    });
  } catch (error) {
    console.error("Get all products error:", error);
    return res.status(500).json({
      status: "failed",
      message: "Failed to get products",
      error: error.message,
    });
  }
};

// Fungsi untuk membuat produk
export const createProduct = async (req, res) => {
  const vendor_id = req.user.id; // Ambil ID vendor dari token JWT
  const { name, description, price, qr_code } = req.body;

  if (!name || !description || !price || !qr_code) {
    return res.status(400).json({
      status: "failed",
      message: "Please provide name, description, price, and qr_code",
    });
  }

    try {
      const [result] = await db.query(
        "INSERT INTO product (vendor_id, name, description, price, qr_code, image) VALUES (?, ?, ?, ?, ?, ?)",
        [vendor_id, name, description, price, qr_code, image]
      );

    return res.status(201).json({
      status: "success",
      message: "Product created",
      data: {
        id: result.insertId,
        vendor_id,
        name,
        description,
        price,
        qr_code,
      },
    });
  } catch (error) {
    console.error("Create product error:", error);
    return res.status(500).json({
      status: "failed",
      message: "Failed to create product",
      error: error.message,
    });
  }
};

// Fungsi untuk mendapatkan detail produk
export const getProduct = async (req, res) => {
  const vendor_id = req.user.id; // Ambil ID vendor dari token JWT
  const { id } = req.params;

  try {
    const [rows] = await db.query("SELECT * FROM product WHERE id = ? AND vendor_id = ?", [id, vendor_id]);

    if (rows.length === 0) {
      return res.status(404).json({ status: "failed", message: "Product not found" });
    }

    return res.status(200).json({
      status: "success",
      data: rows[0],
    });
  } catch (error) {
    console.error("Get product error:", error);
    return res.status(500).json({
      status: "failed",
      message: "Failed to retrieve product",
      error: error.message,
    });
  }
};

// Fungsi untuk memperbarui produk
export const updateProduct = async (req, res) => {
  const vendor_id = req.user.id; // Ambil ID vendor dari token JWT
  const { id } = req.params;
  const { name, description, price, qr_code } = req.body;

  if (!name && !description && !price && !qr_code) {
    return res.status(400).json({
      status: "failed",
      message: "Please provide data to update",
    });
  }

    try {
      // Ambil gambar lama untuk dihapus jika ada gambar baru

      if (image) {
        const [rows] = await db.query(
          "SELECT image FROM products WHERE id = ?",
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

      const [result] = await db.query(
        `UPDATE product SET 
          name = COALESCE(?, name), 
          description = COALESCE(?, description), 
          price = COALESCE(?, price), 
          qr_code = COALESCE(?, qr_code), 
          image = COALESCE(?, image)
        WHERE id = ? AND vendor_id = ?`,
        [name, description, price, qr_code, image, id, vendor_id]
      );

    if (result.affectedRows === 0) {
      return res.status(404).json({ status: "failed", message: "Product not found" });
    }

      return res.status(200).json({
        status: "success",
        message: "Product updated successfully",
      });
    } catch (error) {
      console.error("Update product error:", error);
      return res.status(500).json({
        status: "failed",
        message: "Failed to update product",
        error: error.message,
      });
    }
  },
];

// Fungsi untuk menghapus produk (hanya vendor yang dapat mengakses)
export const deleteProduct = async (req, res) => {
  const vendor_id = req.user.id; // Ambil ID vendor dari token JWT
  const { id } = req.params;

  try {
    const [result] = await db.query("DELETE FROM product WHERE id = ? AND vendor_id = ?", [id, vendor_id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ status: "failed", message: "Product not found" });
    }

    return res.status(200).json({
      status: "success",
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Delete product error:", error);
    return res.status(500).json({
      status: "failed",
      message: "Failed to delete product",
      error: error.message,
    });
  }
};

export const createProductWithIngredients = [
  upload.single("image"), // Middleware untuk upload gambar
  async (req, res) => {
    const vendor_id = req.user.id;
    const { name, description, price, qr_code, ingredients } = req.body;
    const image = req.file ? `/assets/products/${req.file.filename}` : null;

    if (!name || !description || !price || !qr_code) {
      return res.status(400).json({
        status: "failed",
        message: "Please provide name, description, price, and qr_code",
      });
    }

    try {
      // Mulai transaksi
      await db.query("START TRANSACTION");

      // Insert ke tabel produk
      const [productResult] = await db.query(
        "INSERT INTO product (vendor_id, name, description, price, qr_code, image) VALUES (?, ?, ?, ?, ?, ?)",
        [vendor_id, name, description, price, qr_code, image]
      );
      const productId = productResult.insertId;

      // Jika ada ingredients, tambahkan ke pivot table
      if (ingredients && Array.isArray(ingredients)) {
        const ingredientInserts = ingredients.map(({ ingredient_id, qty }) => [
          productId,
          ingredient_id,
          qty,
        ]);

        await db.query(
          "INSERT INTO ingredients_product (product_id, ingredients_id, qty) VALUES ?",
          [ingredientInserts]
        );
      }

      // Commit transaksi
      await db.query("COMMIT");

      return res.status(201).json({
        status: "success",
        message: "Product created with ingredients",
        data: {
          id: productId,
          name,
          description,
          price,
          qr_code,
          image,
        },
      });
    } catch (error) {
      // Rollback transaksi jika terjadi error
      await db.query("ROLLBACK");
      console.error("Create product with ingredients error:", error);
      return res.status(500).json({
        status: "failed",
        message: "Failed to create product with ingredients",
        error: error.message,
      });
    }
  },
];
