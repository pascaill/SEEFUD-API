import db from "../connection/connection.mjs";

// Standard Response Helper
const standardResponse = (status, message, data = null) => ({
  status,
  message,
  ...(data && { data }),
});

// Get Counts for Users and Vendors
export const getCounts = async (req, res) => {
  try {
    const [[userCount]] = await db.query(
      "SELECT COUNT(*) AS totalUsers FROM users WHERE role != 'admin'"
    );
    const [[vendorCount]] = await db.query(
      "SELECT COUNT(*) AS totalVendors FROM vendor"
    );
    const [[customerCount]] = await db.query(
      "SELECT COUNT(*) AS totalCustomers FROM users WHERE role = 'customer'"
    );
    const [[reportsCounts]] = await db.query(
      "SELECT COUNT(*) AS totalReports FROM feedback"
    );

    return res.status(200).json({
      status: "success",
      message: "Counts retrieved successfully",
      data: {
        totalUsers: userCount.totalUsers,
        totalVendors: vendorCount.totalVendors,
        totalCustomers: customerCount.totalCustomers,
        totalReports: reportsCounts.totalReports,
      },
    });
  } catch (error) {
    console.error("Get counts error:", error.message);
    return res.status(500).json({
      status: "failed",
      message: "Could not retrieve counts",
    });
  }
};

// Get List of Vendors
export const getVendors = async (req, res) => {
  try {
    const [vendors] = await db.query(
      "SELECT id AS vendorId, name, location, rating FROM users WHERE role = 'vendor'"
    );

    return res.status(200).json({
      status: "success",
      message: "Vendors retrieved successfully",
      data: vendors,
    });
  } catch (error) {
    console.error("Get vendors error:", error.message);
    return res.status(500).json({
      status: "failed",
      message: "Could not retrieve vendors",
    });
  }
};

// Get Feedback for Vendor
export const getFeedback = async (req, res) => {
  const { vendorId } = req.params;

  try {
    const [feedbacks] = await db.query(
      `SELECT 
        f.*,
        u.name AS user_name,
        v.store_name AS vendor_name
      FROM 
        feedback AS f
      JOIN 
        users AS u 
      ON 
        f.user_id = u.id
      JOIN 
        vendor AS v
      ON 
        f.vendor_id = v.id
      WHERE 
        f.vendor_id = ?`,
      [vendorId]
    );

    return res
      .status(200)
      .json(
        standardResponse(
          "success",
          "Feedback retrieved successfully",
          feedbacks
        )
      );
  } catch (error) {
    console.error("Get feedback error:", error);
    return res.status(500).json(
      standardResponse("failed", "Could not retrieve feedback", {
        error: error.message,
      })
    );
  }
};

// Delete Vendor
export const deleteVendor = async (req, res) => {
  const { vendorId } = req.params;

  try {
    const [result] = await db.query("DELETE FROM vendor WHERE id = ?", [
      vendorId,
    ]);

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json(standardResponse("failed", "Vendor not found or not a vendor"));
    }

    return res
      .status(200)
      .json(standardResponse("success", "Vendor deleted successfully"));
  } catch (error) {
    console.error("Delete vendor error:", error);
    return res.status(500).json(
      standardResponse("failed", "Could not delete vendor", {
        error: error.message,
      })
    );
  }
};

// Update Vendor Rating
export const updateVendorRating = async (req, res) => {
  const { vendorId } = req.params;
  let { rating } = req.body;

  rating = parseInt(rating); // change a typeof from string to integer

  if (typeof rating !== "number" || rating < 0 || rating > 5) {
    return res
      .status(400)
      .json(standardResponse("failed", "A valid rating (0-5) is required"));
  }

  try {
    const [result] = await db.query(
      "UPDATE vendor SET rating = ? WHERE id = ?",
      [rating, vendorId]
    );

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json(standardResponse("failed", "Vendor not found"));
    }

    return res
      .status(200)
      .json(standardResponse("success", "Vendor rating updated successfully"));
  } catch (error) {
    console.error("Update vendor rating error:", error);
    return res.status(500).json(
      standardResponse("failed", "Could not update vendor rating", {
        error: error.message,
      })
    );
  }
};
export const getAllUsers = async (req, res) => {
  try {
    const [users] = await db.query("SELECT * FROM users WHERE role != 'admin'");

    return res.status(200).json({
      status: "success",
      message: "Users retrieved successfully",
      data: users,
    });
  } catch (error) {
    console.error("Get users error:", error.message);
    return res.status(500).json({
      status: "failed",
      message: "Could not retrieve users",
    });
  }
};

// Delete Vendor
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query("DELETE FROM users WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json(standardResponse("failed", "User not found"));
    }

    return res
      .status(200)
      .json(standardResponse("success", "User deleted successfully"));
  } catch (error) {
    console.error("Delete user error:", error);
    return res.status(500).json(
      standardResponse("failed", "Could not delete user", {
        error: error.message,
      })
    );
  }
};

export const editUser = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query("DELETE FROM users WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json(standardResponse("failed", "User not found"));
    }

    return res
      .status(200)
      .json(standardResponse("success", "User deleted successfully"));
  } catch (error) {
    console.error("Delete user error:", error);
    return res.status(500).json(
      standardResponse("failed", "Could not delete user", {
        error: error.message,
      })
    );
  }
};
