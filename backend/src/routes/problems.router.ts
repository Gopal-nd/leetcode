
import express from 'express'
import { adminAuth, userAuth } from '../middleware/auth.middleware'
import { createProblem, deleteProblemById, getAllProblems, getProblemById, getUserSolvedProblems, updateProblemById } from '../controllers/problems.controller'
import { ApiResponse } from '../utils/api-response';
import asyncHandler from '../utils/async-handler';
import prisma from '../lib/db';
const router = express.Router()
export const userStats = asyncHandler(async (req, res) => {
    const count = await prisma.problems.count({
        where: {
            problemSolved: {
                some: {
                    userId: req.user?.id
                }
            },
        
        },

    
    })
    const tags = await prisma.problemSolved.findMany({
        where: {
            userId: req.user?.id
        },
        select: {
            problem: {
                select: {
                    difficulty: true
                },
                
            }
        }
    })
    const difficultyCount = tags.reduce((acc, curr) => {
  const level = curr.problem.difficulty;
  acc[level] = (acc[level] || 0) + 1;
  return acc;
}, {} as Record<string, number>);
    const total = await prisma.problems.count()
    console.log("problems solved count",count,"/",total,tags,difficultyCount)

    return res.json( new ApiResponse({
        statusCode: 200,
        data: {count,total,difficultyCount},
        message: "Success",
    }))
})

router.get('/get-all-problems',  userAuth, getAllProblems)

router.post('/create-problem', adminAuth, createProblem)

router.get('/get-problem/:id', userAuth, getProblemById)

router.put('/update-problem/:id', adminAuth, updateProblemById)

router.delete('/delete-problem/:id', adminAuth, deleteProblemById)

router.get('/get-solved-problems', userAuth, getUserSolvedProblems)

router.get('/user-stats', userAuth, userStats);

export default router