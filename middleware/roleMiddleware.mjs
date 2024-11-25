export const isVendor = (req, res, next) => {
  if (req.user.role !== "vendor") {
    return res.status(403).json({
      status: "failed",
      message: "Access denied. Only vendors can perform this action.",
    });
  }
  next();
};

export const isVendorOrAdmin = (req, res, next) => {
  const { role } = req.user; // Role berasal dari token JWT
  if (role !== "vendor" && role !== "admin") {
    return res.status(403).json({
      status: "failed",
      message: "Access denied. Only vendors or admins can perform this action.",
    });
  }
  next();
};

export const isUser = (req, res, next) => {
  const { role } = req.user; // Role berasal dari token JWT
  if (role !== "user") {
    return res.status(403).json({
      status: "failed",
      message: "Access denied. Only users can perform this action.",
    });
  }
  next();
};
