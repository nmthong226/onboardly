import express, { json } from 'express';
import cors from "cors";
import connectDB from './db.js';
import dotenv from 'dotenv';

//Routes
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(json());

connectDB();

app.get('/', (req, res) => {
    res.send('Hello from Express!');
});

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});