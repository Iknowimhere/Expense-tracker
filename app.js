import express from 'express';
import {connectDB} from './config/db.js';
import userRoutes from './routes/userRoutes.js';
let app=express();
connectDB()

//midddlewares
app.use(express.json());

app.use("/api/user",userRoutes)

export default app;