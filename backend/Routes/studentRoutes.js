import express from "express";
import verifyToken from "../../middleware/jwtAuthMiddleware.js";
import { addStudent,getStudents } from "../controllers/studentController.js";


const router = express.Router();

router.post("/",addStudent);
router.get("/",getStudents);


export default router;