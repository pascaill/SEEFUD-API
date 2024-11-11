import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.mjs";
import umkmRoutes from "./routes/umkmRoutes.mjs";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Gunakan rute yang dipisahkan
app.use(authRoutes);
app.use(umkmRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
