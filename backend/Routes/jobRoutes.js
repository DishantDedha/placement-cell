
import express from 'express';
import { fetchJobs } from '../controllers/jobController.js';

const router = express.Router();

router.get('/', fetchJobs);

export default router;
