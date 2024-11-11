import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.mjs";
import vendorRoutes from "./routes/vendorRoutes.mjs";
import productRoutes from "./routes/productRoutes.mjs";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Gunakan rute yang dipisahkan
app.use(authRoutes);
app.use(vendorRoutes);
app.use(productRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
