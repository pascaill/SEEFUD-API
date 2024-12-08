import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mainRoutes from "./routes/mainRoutes.mjs";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(mainRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
