
import express from 'express'
import { adminAuth, userAuth } from '../middleware/auth.middleware'
import { createProblem, deleteProblemById, getAllProblems, getProblemById, getUserSolvedProblems, updateProblemById } from '../controllers/problems.controller'

const router = express.Router()

router.get('/get-all-problems',  userAuth,adminAuth, getAllProblems)

router.post('/create-problem', adminAuth, createProblem)

router.get('/get-problem/:id', userAuth,adminAuth, getProblemById)

router.put('/update-problem/:id', adminAuth, updateProblemById)

router.delete('/delete-problem/:id', adminAuth, deleteProblemById)

router.get('/get-solved-problems', userAuth, getUserSolvedProblems)

export default router