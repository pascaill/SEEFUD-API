import express from "express";
import dotenv from "dotenv";
import {
  register,
  login,
  logout,
  updateProfile,
  deleteAccount,
} from "./routes/auth.mjs";
import {
  authenticateToken,
  authorizeRole,
} from "./middleware/authMiddleware.mjs";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

app.post("/register", register);
app.post("/login", login);
app.post("/logout", logout);
app.put("/profile", authenticateToken, updateProfile);
app.delete("/profile", authenticateToken, deleteAccount);
app.get(
  "/umkm-dashboard",
  authenticateToken,
  authorizeRole("pemilik_umkm"),
  (req, res) => {
    res.status(200).json({ message: "Welcome to UMKM dashboard" });
  }
);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
