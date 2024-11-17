import db from "../connection/connection.mjs";

// Fungsi untuk mendapatkan semua produk milik vendor
export const getAllProducts = async (req, res) => {
  const vendor_id = req.user.id; // Ambil ID vendor dari token JWT

  try {
    const [results] = await db.query("SELECT * FROM product WHERE vendor_id = ?", [vendor_id]);

    return res.status(200).json({
      status: "success",
      message: "Product Collection",
      data: results,
    });
  } catch (error) {
    console.error("Collect all products error:", error);
    return res.status(500).json({
      status: "failed",
      message: "Failed to get all products",
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
      "INSERT INTO product (vendor_id, name, description, price, qr_code) VALUES (?, ?, ?, ?, ?)",
      [vendor_id, name, description, price, qr_code]
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
    const [result] = await db.query(
      `UPDATE product SET 
        name = COALESCE(?, name), 
        description = COALESCE(?, description), 
        price = COALESCE(?, price), 
        qr_code = COALESCE(?, qr_code)
      WHERE id = ? AND vendor_id = ?`,
      [name, description, price, qr_code, id, vendor_id]
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
};

// Fungsi untuk menghapus produk
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
