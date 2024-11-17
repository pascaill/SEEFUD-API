import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import db from "../connection/connection.mjs";

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
};

export const register = async (req, res) => {
  const roles = ["vendor", "customer"];
  const { name, email, password, role } = req.body;
  if (!name || !email || !password || !role) {
    return res
      .status(400)
      .json({ error: "Please provide name, email, and password, role" });
  }
  if (!roles.includes(role)) {
    return res
      .status(400)
      .json({ error: 'Role must be either "vendor" or "customer"' });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, role]
    );

    const user = { id: result.insertId, name, email, role };
    const token = generateToken(user);

    return res.status(201).json({
      status: "success",
      message: "User created",
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res
      .status(500)
      .json({ status: "failed", message: "Try again", error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Please provide email and password" });
  }

  try {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ status: "failed", message: "Invalid credentials" });
    }

    const token = generateToken(user);
    return res.status(200).json({
      status: "success",
      message: "Login successful",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res
      .status(500)
      .json({ status: "failed", message: "Try again", error: error.message });
  }
};

export const logout = (req, res) => {
  return res.status(200).json({ message: "User logged out successfully" });
};

export const deleteAccount = async (req, res) => {
  const { id, email: userEmail } = req.user;
  const { email } = req.body;

  if (email !== userEmail) {
    return res.status(403).json({
      status: "failed",
      message: "Email does not match registered email",
    });
  }

  try {
    await db.query("DELETE FROM users WHERE id = ?", [id]);
    return res
      .status(200)
      .json({ status: "success", message: "Account deleted" });
  } catch (error) {
    console.error("Delete error:", error);
    return res.status(500).json({
      status: "failed",
      message: "Could not delete account",
      error: error.message,
    });
  }
};
export const updateProfile = async (req, res) => {
  const { id } = req.user;
  const { name, email } = req.body;

  if (!name && !email) {
    return res
      .status(400)
      .json({ error: "Please provide information to update" });
  }

  try {
    const [result] = await db.query(
      "UPDATE users SET name = COALESCE(?, name), email = COALESCE(?, email) WHERE id = ?",
      [name, email, id]
    );

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ status: "failed", message: "User not found" });
    }

    return res.status(200).json({
      status: "success",
      message: "Profile updated successfully",
      data: { id, name, email },
    });
  } catch (error) {
    console.error("Update profile error:", error);
    return res.status(500).json({
      status: "failed",
      message: "Could not update profile",
      error: error.message,
    });
  }
};
