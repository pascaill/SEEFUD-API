import express from "express";
import dotenv from "dotenv";
import { register, login, logout } from "./routes/auth.mjs";
import { authenticateToken } from "./middleware/authMiddleware.mjs";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

app.post("/register", register);
app.post("/login", login);
app.post("/logout", logout);
app.get("/protected", authenticateToken, (req, res) => {
  res
    .status(200)
    .json({ message: "Access granted to protected route", user: req.user });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
