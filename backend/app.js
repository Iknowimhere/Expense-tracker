import budgetRoutes from "./routes/budgetRoutes.js";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import transactionRoutes from "./routes/transactionRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { connectDB } from "./config/db.js";

dotenv.config();
let app = express();
connectDB();

//midddlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/user', userRoutes);
app.use("/api/transaction",transactionRoutes)
app.use("/api/budget",budgetRoutes)

export default app;
