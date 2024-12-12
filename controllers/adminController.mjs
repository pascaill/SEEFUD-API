import db from "../connection/connection.mjs";
import bcrypt from "bcrypt";
const connection = await db.getConnection();
// eslint-disable-next-line
import dummyData from "../dummy.json" assert { type: "json" };

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
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const [[user]] = await db.query(
      `SELECT * FROM users WHERE id = ${parseInt(id)}`
    );

    return res.status(200).json({
      status: "success",
      message: "Users retrieved successfully",
      data: user,
    });
  } catch (error) {
    console.error("Get users error:", error.message);
    return res.status(500).json({
      status: "failed",
      message: "Could not retrieve users",
    });
  }
};

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

export const insertDummy = async (req, res) => {
  const {
    users,
    vendors,
    products,
    ingredients,
    ingredientsProducts,
    feedbacks,
  } = dummyData;

  try {
    await connection.beginTransaction(); // Mulai transaksi

    // Hash password (bisa di-optimasi lebih lanjut, lihat penjelasan sebelumnya)
    for (const user of users) {
      user.password = await bcrypt.hash(user.password, 10);
    }

    // Gunakan Promise.all untuk menjalankan query secara bersamaan
    await Promise.all([
      executeInsertDummy("users", users),
      executeInsertDummy("vendor", vendors),
      executeInsertDummy("product", products),
      executeInsertDummy("ingredients", ingredients),
      executeInsertDummy("ingredients_product", ingredientsProducts),
      executeInsertDummy("feedback", feedbacks),
    ]);

    await connection.commit(); // Commit transaksi

    return res.status(201).json({
      status: "success",
      message: "Seeder Data has been successfully added",
    });
  } catch (error) {
    await connection.rollback(); // Rollback transaksi jika terjadi error
    console.error("insert data dummy gagal : ", error);
    return res
      .status(500)
      .json({ status: "failed", message: "Try again", error: error.message });
  }
};

const executeInsertDummy = async (tableName, data) => {
  try {
    // Implementasi bulk insert
    const values = data.map((item) => Object.values(item));
    const query = `INSERT INTO ${tableName} (${Object.keys(data[0]).join(
      ","
    )}) VALUES ?`;
    const [result] = await connection.query(query, [values]);

    console.log(`Data berhasil dimasukkan ke tabel ${tableName}`);
    return result;
  } catch (error) {
    console.error(`Error saat memasukkan data ke tabel ${tableName}:`, error);
    throw error; // Melempar error agar ditangkap oleh fungsi insertDummy
  }
};

export const updateStatuFeedback = async (req, res) => {
  const { id } = req.params;
  const { report_status } = req.body;

  if (typeof report_status === "undefined") {
    return res.status(400).json({
      status: "failed",
      message: "Please make report status",
    });
  }

  try {
    // Update feedback dengan data baru
    const [result] = await db.query(
      `UPDATE feedback SET 
        report_status = COALESCE(?, report_status)
      WHERE id = ?`,
      [report_status, parseInt(id)]
    );

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ status: "failed", message: "Feedback not found" });
    }

    return res.status(200).json({
      status: "success",
      message: "Feedback status updated successfully",
    });
  } catch (error) {
    console.error("Update feedback error:", error);
    return res.status(500).json({
      status: "failed",
      message: "Failed to update feedback status",
      error: error.message,
    });
  }
};

export const deleteUserVendorOrCustomer = async (req, res) => {
  const { id } = req.params;

  try {
    // Mengambil data user berdasarkan ID, serta role dan detailnya
    const [[user]] = await db.query(
      `
      SELECT u.id, u.role, 
             CASE WHEN u.role = 'vendor' THEN v.user_id END AS vendor_id,
             CASE WHEN u.role = 'customer' THEN f.user_id END AS customer_id
      FROM users u
      LEFT JOIN vendor v ON u.id = v.user_id
      LEFT JOIN feedback f ON u.id = f.user_id
      WHERE u.id = ?
    `,
      [id]
    );

    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    // Pengecekan relasi berdasarkan role
    if (user.role === "vendor" && user.vendor_id) {
      return res.status(400).json({
        message:
          "User tidak dapat dihapus karena memiliki relasi dengan data vendor",
      });
    }

    if (user.role === "customer" && user.customer_id) {
      return res.status(400).json({
        message:
          "User tidak dapat dihapus karena memiliki relasi dengan data feedback",
      });
    }

    // Jika tidak ada relasi, hapus user
    await db.query("DELETE FROM users WHERE id = ?", [id]);

    return res.status(200).json({ message: "User berhasil dihapus" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};
