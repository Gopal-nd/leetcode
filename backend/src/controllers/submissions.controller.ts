import prisma from "../lib/db";
import { APIError } from "../utils/api-error";
import { ApiResponse } from "../utils/api-response";
import asyncHandler from "../utils/async-handler";

export const getAllSubmissions = asyncHandler(async (req, res) => {

    if(!req.user){
       throw new APIError({
           status: 400,
           message: "User not found"
       })
    }
    
        const submissions = await prisma.submission.findMany({
            where: {
                userId: req.user.id
            },
            include:{
                testCases: true
            }
        })

        return res.json( new ApiResponse({
            statusCode: 200,
            data: submissions,
            message: "Success",
          }))
    
});

export const getSubmissionById = asyncHandler(async (req, res) => {

    const {id} = req.params
        if(!req.user){
       throw new APIError({
           status: 400,
           message: "User not found"
       })
    }
    
        const submissions = await prisma.submission.findMany({
            where: {
                userId: req.user.id,
                problemId: id
            }
        })
        
        return res.json( new ApiResponse({
            statusCode: 200,
            data: submissions,
            message: "Success",
          }))
});

export const getAllSubmissionsForProblem = asyncHandler(async (req, res) => {

    const {id} = req.params
        if(!req.user){
       throw new APIError({
           status: 400,
           message: "User not found"
       })
    }
    
        const count = await prisma.submission.count({
            where: {
                problemId: id
            },
            
        })
        
        return res.json( new ApiResponse({
            statusCode: 200,
            data: count,
            message: "Success",
          }))
});