import express from "express";
import userRoutes from "./backend/Routes/userRoutes.js";
import studentRoutes from "./backend/Routes/studentRoutes.js";
import interviewRoutes from "./backend/Routes/interviewRoutes.js";
import jobRoutes from "./backend/Routes/jobRoutes.js";
import csvRoutes from "./backend/Routes/csvRoutes.js"
import cors from 'cors';


const app= express();
// Use CORS middleware
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/auth",userRoutes);
app.use("/api/students",studentRoutes);
app.use("/api/interviews",interviewRoutes);
app.use("/api/jobs",jobRoutes);
app.use("/api/csv",csvRoutes);










export default app;
