import db from "../connection/connection.mjs";

export const validateVendorId = async (req, res, next) => {
  const { vendorId } = req.params;

  if (!vendorId) {
    return res.status(400).json({
      status: "failed",
      message: "Vendor ID is required",
    });
  }

  try {
    const [result] = await db.query(
      "SELECT * FROM users WHERE id = ? AND role = 'vendor'",
      [vendorId]
    );
    if (result.length === 0) {
      return res.status(404).json({
        status: "failed",
        message: "Vendor not found",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: "An error occurred while validating vendor ID",
    });
  }
};
