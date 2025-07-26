import express from 'express'
import { userAuth } from '../middleware/auth.middleware'
import { getAllSubmissionsForProblem, getAllSubmissions, getSubmissionById } from '../controllers/submissions.controller';

const router = express.Router()


router.get('/get-all-submissions', userAuth, getAllSubmissions);

router.get('/get-submission/:id', userAuth, getSubmissionById);

router.get('/get-submissions-count/:id', userAuth, getAllSubmissionsForProblem);




export default router



