import db from "../connection/connection.mjs";
import multer from "multer";

// Konfigurasi Multer untuk menyimpan file di memori
const storage = multer.memoryStorage();
export const upload = multer({ storage });

// Fungsi untuk membuat feedback
export const createFeedback = async (req, res) => {
  const user_id = req.user.id; // Ambil dari middleware autentikasi
  const vendor_id = req.params.vendorId; // Ambil dari parameter URL
  const { rating, comment, report_status } = req.body;
  const foto = req.file ? req.file.buffer : null; // Ambil data file sebagai buffer

  if (!rating || !comment || !report_status) {
    return res.status(400).json({
      status: "failed",
      message: "Please provide rating, comment, and report_status",
    });
  }

  try {
    // Simpan data ke database
    const [result] = await db.query(
      "INSERT INTO feedback (user_id, vendor_id, rating, comment, foto, report_status) VALUES (?, ?, ?, ?, ?, ?)",
      [user_id, vendor_id, rating, comment, foto, report_status]
    );

    return res.status(201).json({
      status: "success",
      message: "Feedback created successfully",
      data: {
        id: result.insertId,
        user_id,
        vendor_id,
        rating,
        comment,
        report_status,
      },
    });
  } catch (error) {
    console.error("Create feedback error:", error);
    return res.status(500).json({
      status: "failed",
      message: "Failed to create feedback",
      error: error.message,
    });
  }
};

// Fungsi untuk mendapatkan feedback
export const getFeedback = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.query("SELECT * FROM feedback WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ status: "failed", message: "Feedback not found" });
    }

    const feedback = rows[0];

    // Konversi foto dari BLOB ke base64 jika ada
    if (feedback.foto) {
      feedback.foto = `data:image/jpeg;base64,${feedback.foto.toString(
        "base64"
      )}`;
    }

    return res.status(200).json({
      status: "success",
      data: feedback,
    });
  } catch (error) {
    console.error("Get feedback error:", error);
    return res.status(500).json({
      status: "failed",
      message: "Failed to retrieve feedback",
      error: error.message,
    });
  }
};

// Fungsi untuk memperbarui feedback
export const updateFeedback = async (req, res) => {
  const { id } = req.params;
  const { rating, comment, report_status } = req.body;
  const foto = req.file ? req.file.buffer : null; // Jika ada foto baru

  if (!rating && !comment && !report_status && !foto) {
    return res.status(400).json({
      status: "failed",
      message: "Please provide data to update",
    });
  }

  try {
    // Update feedback dengan data baru
    const [result] = await db.query(
      `UPDATE feedback SET 
        rating = COALESCE(?, rating), 
        comment = COALESCE(?, comment), 
        report_status = COALESCE(?, report_status),
        foto = COALESCE(?, foto)
      WHERE id = ?`,
      [rating, comment, report_status, foto, id]
    );

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ status: "failed", message: "Feedback not found" });
    }

    return res.status(200).json({
      status: "success",
      message: "Feedback updated successfully",
    });
  } catch (error) {
    console.error("Update feedback error:", error);
    return res.status(500).json({
      status: "failed",
      message: "Failed to update feedback",
      error: error.message,
    });
  }
};

// Fungsi untuk menghapus feedback
export const deleteFeedback = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query("DELETE FROM feedback WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ status: "failed", message: "Feedback not found" });
    }

    return res.status(200).json({
      status: "success",
      message: "Feedback deleted successfully",
    });
  } catch (error) {
    console.error("Delete feedback error:", error);
    return res.status(500).json({
      status: "failed",
      message: "Failed to delete feedback",
      error: error.message,
    });
  }
};
