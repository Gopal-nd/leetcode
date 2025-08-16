
import express from 'express'
import { adminAuth } from '../middleware/auth.middleware'
import {  userAuth } from '../middleware/auth.middleware'
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
                        },
                        
                    },
                    createdAt  : true

                }
            }
        }
    })

const dailyCounts = user?.submissions.reduce((acc: Record<string, number>, sub) => {
  const date = sub.createdAt.toISOString().split('T')[0] as string;
  acc[date] = (acc[date ] || 0) + 1;
  return acc;
}, {});

const values = Object.entries(dailyCounts as Record<string, number>).map(([date, count]) => ({ date, count }));





    return res.json( new ApiResponse({
        statusCode: 200,
        data: values,
        message: "Success",
    }))
})

router.get('/',  userAuth,heatmapRouter )

export default router