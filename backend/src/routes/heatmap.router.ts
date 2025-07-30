
import express from 'express'
import { adminAuth, userAuth } from '../middleware/auth.middleware'
import asyncHandler from '../utils/async-handler'
import { ApiResponse } from '../utils/api-response'
import { APIError } from '../utils/api-error'
import prisma from '../lib/db'

const router = express.Router()


export const heatmapRouter = asyncHandler(async (req, res) => {
    const id = req.user?.id
    if(!id) throw new APIError({status: 400, message: "User not found"})

    const user = await prisma.user.findUnique({
        where: {
            id: id
        },
        select:{
            submissions: {
                select: {
                    problem: {
                        select: {
                            id: true,
                            title: true,
                            _count: {
                                select: {
                                    submissions: true
                                }
                            },

                        }
                    },

                    createdAt  : true
                }
            }
        }
    })
    console.log("user", user)
    let count = 0
    let outDates:string ;
const raw = user?.submissions.map((sub) => {
  const date = new Date(sub.createdAt).toISOString().split('T')[0]  // Ensure it's a Date
  const count = sub.problem._count.submissions || 1  // fallback if not present
  return { date, count }
})

const merged = raw?.reduce((acc: Record<string, number>, curr) => {
  if (!curr?.date) return acc
  acc[curr.date] = (acc[curr.date] || 0) + curr.count
  return acc
}, {})

// Convert object to array format required by the heatmap
const values = Object.entries(merged!).map(([date, count]) => ({ date, count }))

console.log("Heatmap values", values)



    return res.json( new ApiResponse({
        statusCode: 200,
        data: values,
        message: "Success",
    }))
})

router.get('/',  userAuth,heatmapRouter )

export default router