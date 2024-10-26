import express from "express";

import { downloadCSV } from "../controllers/csvController.js";

const router = express.Router();

router.get('/', downloadCSV);

export default router;