import db from "../connection/connection.mjs";
import multer from "multer";
import path from "path";
import fs from "fs/promises";

const destinationUpload = "public/images/products";
// Konfigurasi Multer untuk menyimpan file di memori
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(process.cwd(), destinationUpload);
    cb(null, uploadPath); // Direktori penyimpanan
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Nama file unik
  },
});

export const upload = multer({ storage });
// Fungsi untuk mendapatkan semua produk milik vendor tertentu (dapat diakses oleh semua user)
export const getAllProducts = async (req, res) => {
  const { vendorId } = req.params; // ID vendor dari parameter URL

  try {
    const [results] = await db.query(
      "SELECT * FROM product WHERE vendor_id = ?",
      [vendorId]
    );

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

// Fungsi untuk membuat produk (hanya vendor yang dapat mengakses)
export const createProduct = async (req, res) => {
  const vendor_id = req.user.id; // Ambil ID vendor dari token JWT
  const { name, description, price, qr_code } = req.body;
  const image = req.file ? req.file.filename : null; //
  if (!name || !description || typeof price !== "number" || !qr_code) {
    return res.status(400).json({
      status: "failed",
      message: "Please provide valid name, description, price, and qr_code",
    });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO product (vendor_id, name, description, price, image, qr_code) VALUES (?, ?, ?, ?, ?, ?)",
      [vendor_id, name, description, price, image, qr_code]
    );

    return res.status(201).json({
      status: "success",
      message: "Product created successfully",
      data: {
        id: result.insertId,
        vendor_id,
        name,
        description,
        price,
        image,
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

// Fungsi untuk memperbarui produk (hanya vendor yang dapat mengakses)
export const updateProduct = async (req, res) => {
  const vendor_id = req.user.id; // Ambil ID vendor dari token JWT
  const { id } = req.params;
  const { name, description, price, qr_code } = req.body;
  const image = req.file ? `/images/products/${req.file.filename}` : null; // Path gambar
  if (!name && !description && typeof price === "undefined" && !qr_code) {
    return res.status(400).json({
      status: "failed",
      message: "Please provide data to update",
    });
  }

  try {
    const [result] = await db.query(
      `UPDATE product SET 
        name = COALESCE(?, name), 
        description = COALESCE(?, description), 
        price = COALESCE(?, price), 
         image = COALESCE(?, image), 
        qr_code = COALESCE(?, qr_code)
      WHERE id = ? AND vendor_id = ?`,
      [name, description, price, image, qr_code, id, vendor_id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: "failed",
        message: "Product not found or not authorized to update",
      });
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
};

// Fungsi untuk menghapus produk (hanya vendor yang dapat mengakses)
export const deleteProduct = async (req, res) => {
  const vendor_id = req.user.id; // Ambil ID vendor dari token JWT
  const { id } = req.params;

  try {
    const [rows] = await db.query("SELECT image FROM products WHERE id = ?", [
      id,
    ]);
    if (rows.length > 0 && rows[0].image) {
      const oldImagePath = path.join(
        process.cwd(),
        destinationUpload,
        rows[0].image
      );
      await fs
        .unlink(oldImagePath)
        .catch((err) => console.error("Failed to delete old image:", err));
    }

    const [result] = await db.query(
      "DELETE FROM product WHERE id = ? AND vendor_id = ?",
      [id, vendor_id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: "failed",
        message: "Product not found or not authorized to delete",
      });
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
