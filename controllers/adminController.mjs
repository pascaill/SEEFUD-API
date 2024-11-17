import db from "../connection/connection.mjs";

export const getCounts = async (req, res) => {
  try {
    const [[userCount]] = await db.query("SELECT COUNT(*) AS totalUsers FROM users WHERE role = 'user'");
    const [[vendorCount]] = await db.query("SELECT COUNT(*) AS totalVendors FROM users WHERE role = 'vendor'");

    return res.status(200).json({
      status: "success",
      data: {
        totalUsers: userCount.totalUsers,
        totalVendors: vendorCount.totalVendors,
      },
    });
  } catch (error) {
    console.error("Get counts error:", error);
    return res.status(500).json({
      status: "failed",
      message: "Could not retrieve counts",
      error: error.message,
    });
  }
};

export const getVendors = async (req, res) => {
  try {
    const [vendors] = await db.query(`
      SELECT 
        v.id AS vendorId,
        v.name AS storeName,
        v.description,
        v.location,
        v.rating,
        v.photo AS photoUrl,
        COUNT(f.id) AS feedbackCount
      FROM 
        users AS v
      LEFT JOIN 
        feedbacks AS f 
      ON 
        v.id = f.vendor_id
      WHERE 
        v.role = 'vendor'
      GROUP BY 
        v.id, v.name, v.description, v.location, v.rating, v.photo
    `);

    return res.status(200).json({
      status: "success",
      data: vendors,
    });
  } catch (error) {
    console.error("Get vendors error:", error);
    return res.status(500).json({
      status: "failed",
      message: "Could not retrieve vendors",
      error: error.message,
    });
  }
};

export const getFeedback = async (req, res) => {
  const { vendorId } = req.params;

  if (!vendorId) {
    return res.status(400).json({ error: "Vendor ID is required" });
  }

  try {
    const [feedbacks] = await db.query(`
      SELECT 
        f.id AS feedbackId,
        u.name AS userName,
        f.rating,
        f.comment,
        f.report_status AS reportStatus,
        f.vendor_id AS vendorId
      FROM 
        feedbacks AS f
      JOIN 
        users AS u 
      ON 
        f.user_id = u.id
      WHERE 
        f.vendor_id = ?
    `, [vendorId]);

    return res.status(200).json({
      status: "success",
      data: feedbacks,
    });
  } catch (error) {
    console.error("Get feedback error:", error);
    return res.status(500).json({
      status: "failed",
      message: "Could not retrieve feedback",
      error: error.message,
    });
  }
};

export const deleteVendor = async (req, res) => {
  const { vendorId } = req.params;

  if (!vendorId) {
    return res.status(400).json({ error: "Vendor ID is required" });
  }

  try {
    const [result] = await db.query("DELETE FROM users WHERE id = ? AND role = 'vendor'", [vendorId]);

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ status: "failed", message: "Vendor not found or not a vendor" });
    }

    return res
      .status(200)
      .json({ status: "success", message: "Vendor deleted successfully" });
  } catch (error) {
    console.error("Delete vendor error:", error);
    return res.status(500).json({
      status: "failed",
      message: "Could not delete vendor",
      error: error.message,
    });
  }
};

export const updateVendorRating = async (req, res) => {
  const { vendorId } = req.params;
  const { rating } = req.body;

  if (!vendorId || typeof rating !== "number" || rating < 0 || rating > 5) {
    return res.status(400).json({
      error: "Vendor ID and a valid rating (0-5) are required",
    });
  }

  try {
    const [result] = await db.query(
      "UPDATE users SET rating = ? WHERE id = ? AND role = 'vendor'",
      [rating, vendorId]
    );

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ status: "failed", message: "Vendor not found" });
    }

    return res.status(200).json({
      status: "success",
      message: "Vendor rating updated successfully",
    });
  } catch (error) {
    console.error("Update vendor rating error:", error);
    return res.status(500).json({
      status: "failed",
      message: "Could not update vendor rating",
      error: error.message,
    });
  }
};
