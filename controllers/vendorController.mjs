import db from "../connection/connection.mjs";
import multer from "multer";
import path from "path";
import fs from "fs/promises";

const destinationUpload = "public/images/vendor";
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
// Mendapatkan semua vendor
export const getAllVendor = async (req, res) => {
  try {
    const [result] = await db.query(`SELECT 
    vendor.*, 
    users.name AS user_name,
    COUNT(feedback.id) AS total_feedback
FROM 
    vendor
LEFT JOIN 
    feedback
ON 
    vendor.id = feedback.vendor_id
LEFT JOIN 
    users
ON 
    vendor.user_id = users.id
GROUP BY 
    vendor.id`);
    return res.status(200).json({
      status: "success",
      message: "Vendor collection retrieved successfully",
      data: result,
    });
  } catch (error) {
    console.error("Collect all vendor error:", error);
    return res.status(500).json({
      status: "failed",
      message: "Failed to get all vendors",
      error: error.message,
    });
  }
};

// Membuat vendor baru (hanya vendor)
export const createVendor = async (req, res) => {
  const { id: user_id } = req.user; // ID vendor dari token JWT
  const { store_name, description, location } = req.body;
  const image = req.file ? req.file.filename : null; // Path gambar

  if (!store_name || !description || !location) {
    return res.status(400).json({
      status: "failed",
      message: "Please provide store_name, description, and location",
    });
  }

  const rating = 0; // default value
  const isVerified = false;

  try {
    const [result] = await db.query(
      "INSERT INTO vendor (user_id, store_name, description, location, rating,is_verified,image) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [user_id, store_name, description, location, rating, isVerified, image]
    );

    return res.status(201).json({
      status: "success",
      message: "Vendor created successfully",
      data: {
        id: result.insertId,
        user_id,
        store_name,
        description,
        location,
        rating,
        isVerified,
        image,
      },
    });
  } catch (error) {
    console.error("Create vendor error:", error);
    return res.status(500).json({
      status: "failed",
      message: "Failed to create vendor",
      error: error.message,
    });
  }
};

// Mendapatkan vendor berdasarkan ID (admin/vendor)
export const getVendor = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.query("SELECT * FROM vendor WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ status: "failed", message: "Vendor not found" });
    }

    return res.status(200).json({
      status: "success",
      data: rows[0],
    });
  } catch (error) {
    // console.error("Get vendor error:", error);
    return res.status(500).json({
      status: "failed",
      message: "Failed to retrieve vendor",
      error: error.message,
    });
  }
};

// Memperbarui vendor (admin/vendor)
export const updateVendor = async (req, res) => {
  const { id } = req.params;
  const { store_name, description, location } = req.body;
  const image = req.file ? `/images/vendor/${req.file.filename}` : null; // Path gambar
  if (!store_name && !description && !location) {
    return res.status(400).json({
      status: "failed",
      message: "Please provide data to update",
    });
  }

  try {
    const [result] = await db.query(
      `UPDATE vendor SET 
        store_name = COALESCE(?, store_name), 
        description = COALESCE(?, description), 
        location = COALESCE(?, location) ,
         image = COALESCE(?, image), 
      WHERE id = ?`,
      [store_name, description, location, image, id]
    );

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ status: "failed", message: "Vendor not found" });
    }

    return res.status(200).json({
      status: "success",
      message: "Vendor updated successfully",
      data: { id, store_name, description, location },
    });
  } catch (error) {
    console.error("Update vendor error:", error);
    return res.status(500).json({
      status: "failed",
      message: "Failed to update vendor",
      error: error.message,
    });
  }
};

// Menghapus vendor (admin/vendor)
export const deleteVendor = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.query("SELECT image FROM vendor WHERE id = ?", [
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

    const [result] = await db.query("DELETE FROM vendor WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ status: "failed", message: "Vendor not found" });
    }

    return res.status(200).json({
      status: "success",
      message: "Vendor deleted successfully",
    });
  } catch (error) {
    console.error("Delete vendor error:", error);
    return res.status(500).json({
      status: "failed",
      message: "Failed to delete vendor",
      error: error.message,
    });
  }
};
