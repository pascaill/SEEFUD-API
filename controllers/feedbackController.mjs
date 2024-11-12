import db from "../connection/connection.mjs";

export const createFeedback = async (req, res) => {
  const { user_id, vendor_id, rating, comment, report_status } = req.body;

  if (!user_id || !vendor_id || !rating || !comment || !report_status) {
    return res.status(400).json({
      status: "failed",
      message:
        "Please provide user_id,vendor_id, rating, comment, and report_status ",
    });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO feedback (user_id,vendor_id, rating, comment, report_status ) VALUES (?, ?, ?, ?, ?)",
      [user_id, vendor_id, rating, comment, report_status]
    );

    return res.status(201).json({
      status: "success",
      message: "Feedback Created",
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

export const getFeedback = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.query("SELECT * FROM feedback WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ status: "failed", message: "feedback not found" });
    }

    return res.status(200).json({
      status: "success",
      data: rows[0],
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

export const updateFeedback = async (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;

  if (!rating && !comment) {
    return res.status(400).json({
      status: "failed",
      message: "Please provide data to update",
    });
  }

  try {
    const [result] = await db.query(
      `UPDATE feedback SET 
        rating = COALESCE(?, rating), 
        comment = COALESCE(?, comment)
      WHERE id = ?`,
      [rating, comment, id]
    );

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ status: "failed", message: "feedback not found" });
    }

    return res.status(200).json({
      status: "success",
      message: "feedback updated successfully",
      data: { id, rating, comment },
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

export const deleteFeedback = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query("DELETE FROM feedback WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ status: "failed", message: "feedback not found" });
    }

    return res.status(200).json({
      status: "success",
      message: "feedback deleted successfully",
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
