import express from "express";
import verifyToken from "../../middleware/jwtAuthMiddleware.js";
import { getInterviews,createInterview,allocateStudent,markResult,getInterviewDetails } from "../controllers/interviewController.js";


const router= express.Router();

router.post("/",verifyToken,createInterview);
router.get("/",verifyToken,getInterviews);

router.post("/allocate",verifyToken,allocateStudent);
router.post("/result",verifyToken,markResult);
router.get("/:id",verifyToken,getInterviewDetails);


export default router;