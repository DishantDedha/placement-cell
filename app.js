import express from "express";
import userRoutes from "./backend/Routes/userRoutes.js";
import studentRoutes from "./backend/Routes/studentRoutes.js";
import interviewRoutes from "./backend/Routes/interviewRoutes.js";
import jobRoutes from "./backend/Routes/jobRoutes.js";
import csvRoutes from "./backend/Routes/csvRoutes.js"
import cors from 'cors';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';


const app= express();
// Use CORS middleware
app.use(cors());
// Set up __dirname for ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'frontend')));

app.use("/api/auth",userRoutes);
app.use("/api/students",studentRoutes);
app.use("/api/interviews",interviewRoutes);
app.use("/api/jobs",jobRoutes);
app.use("/api/csv",csvRoutes);
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});











export default app;
