import db from "../connection/connection.mjs";

export const validateVendorId = async (req, res, next) => {
  const { vendorId } = req.params;

  try {
    const [[vendor]] = await db.query(
      "SELECT * FROM users WHERE id = ? AND role = 'vendor'",
      [vendorId]
    );

    if (!vendor) {
      return res.status(404).json({
        status: "failed",
        message: "Vendor not found",
      });
    }

    req.vendor = vendor; // Pass vendor data to next middleware
    next();
  } catch (error) {
    console.error("Validate vendor ID error:", error);
    return res.status(500).json({
      status: "failed",
      message: "Error validating vendor ID",
      error: error.message,
    });
  }
};
