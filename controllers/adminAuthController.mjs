import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../connection/connection.mjs";

const generateToken = (admin) => {
  return jwt.sign(
    {
      id: admin.id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

// Register Admin
export const registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ error: "Please provide name, email, and password" });
  }

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  try {
    const [existingAdmin] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    if (existingAdmin.length > 0) {
      return res.status(409).json({ error: "Email is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.query(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, 'admin')",
      [name, email, hashedPassword]
    );

    const admin = { id: result.insertId, name, email, role: "admin" };
    const token = generateToken(admin);

    return res.status(201).json({
      status: "success",
      message: "Admin registered successfully",
      data: {
        admin: {
          id: admin.id,
          name: admin.name,
          email: admin.email,
        },
        token,
      },
    });
  } catch (error) {
    console.error("Admin Registration Error:", error);
    return res
      .status(500)
      .json({ error: "Failed to register admin. Please try again." });
  }
};

// Login Admin
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Please provide email and password" });
  }

  try {
    const [rows] = await db.query(
      "SELECT * FROM users WHERE email = ? AND role = 'admin'",
      [email]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Admin not found" });
    }

    const admin = rows[0];
    // const isPasswordValid = await bcrypt.compare(password, admin.password);

    // if (!isPasswordValid) {
    //   return res.status(401).json({ error: "Invalid credentials" });
    // }

    const token = generateToken(admin);

    return res.status(200).json({
      status: "success",
      message: "Login successful",
      data: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        token,
      },
    });
  } catch (error) {
    console.error("Admin Login Error:", error);
    return res
      .status(500)
      .json({ error: "Failed to login. Please try again." });
  }
};

// Logout Admin
export const logoutAdmin = (req, res) => {
  try {
    // Token blacklist logic can be added here
    return res.status(200).json({ message: "Admin logged out successfully" });
  } catch (error) {
    console.error("Logout Error:", error);
    return res
      .status(500)
      .json({ error: "Failed to logout. Please try again." });
  }
};
