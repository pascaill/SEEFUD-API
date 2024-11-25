import db from "../connection/connection.mjs";

// Mendapatkan semua vendor
export const getAllVendor = async (req, res) => {
  try {
    const [result] = await db.query("SELECT * FROM vendor");
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

  if (!store_name || !description || !location) {
    return res.status(400).json({
      status: "failed",
      message: "Please provide store_name, description, and location",
    });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO vendor (user_id, store_name, description, location) VALUES (?, ?, ?, ?)",
      [user_id, store_name, description, location]
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
    console.error("Get vendor error:", error);
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
        location = COALESCE(?, location) 
      WHERE id = ?`,
      [store_name, description, location, id]
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
