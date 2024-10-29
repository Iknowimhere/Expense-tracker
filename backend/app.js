import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { connectDB } from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';
let app = express();
connectDB();

//midddlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/user', userRoutes);

export default app;