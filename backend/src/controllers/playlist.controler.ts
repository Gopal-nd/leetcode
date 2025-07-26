import prisma from "../lib/db";
import { APIError } from "../utils/api-error";
import { ApiResponse } from "../utils/api-response";
import asyncHandler from "../utils/async-handler";

export const createPlaylist = asyncHandler(async (req, res) => {
    const {name, description} = req.body

    if(!req.user) throw new APIError({status: 400, message: "User not found"})

    const playlist = await prisma.playlist.create({
        data: {
            name,
            description,
            userId: req.user.id
        }
    })

    return res.json( new ApiResponse({
        statusCode: 200,
        data: playlist,
        message: "Success",
      }))
})

export const getAllPlaylists  = asyncHandler(async (req, res) => {
       const {name, description} = req.body

    if(!req.user) throw new APIError({status: 400, message: "User not found"})

    const playlist = await prisma.playlist.findMany({
        where: {
            userId: req.user.id
        },
        include: {
           problemInPlaylist: {
            select:{
                problem:true
            }
           }
        }
    })

    return res.json( new ApiResponse({
        statusCode: 200,
        data: playlist,
        message: "Success",
      }))
})

export const getPlaylsitById = asyncHandler(async (req, res) => {
    const {id} = req.params

    if(!req.user) throw new APIError({status: 400, message: "User not found"})

    const playlist = await prisma.playlist.findUnique({
        where: {
            userId: req.user.id,
            id: id
        },
        include: {
           problemInPlaylist: {
            select:{
                problem:true
            }
           }
        }
    })

    if(!playlist) throw new APIError({status: 400, message: "Playlist not found"})

    return res.json( new ApiResponse({
        statusCode: 200,
        data: playlist,
        message: "Success",
      }))
})


export const addProblemToPlaylist = asyncHandler(async (req, res) => {
     const {id} = req.params;
     const {problemId} = req.body

     if(!id) throw new APIError({status: 400, message: "PlaylistId not found"})

    if(!req.user) throw new APIError({status: 400, message: "User not found"})

    if(!Array.isArray(problemId)|| problemId.length === 0) throw new APIError({status: 400, message: "ProblemId must be an array"})

    const playlist = await prisma.problemsInPlaylist.createMany({

        data: problemId.map((problemId) => ({
            playlistId: id,
            problemId: problemId
        }))
      
    })
    return res.json( new ApiResponse({
        statusCode: 200,
        data: playlist,
        message: "Success",
      }))
})

export const deletePlaylistById = asyncHandler(async (req, res) => {
     const {id} = req.params

    if(!req.user) throw new APIError({status: 400, message: "User not found"})

    const playlist = await prisma.playlist.delete({
        where: {
            userId: req.user.id,
            id: id
        },
    })

    if(!playlist) throw new APIError({status: 400, message: "Playlist not found"})

    return res.json( new ApiResponse({
        statusCode: 200,
        data: playlist,
        message: "Success",
      }))
})
export const removeProblemFromPlaylist = asyncHandler(async (req, res) => {
      const {id} = req.params;
     const {problemId} = req.body

     if(!id) throw new APIError({status: 400, message: "PlaylistId not found"})

    if(!req.user) throw new APIError({status: 400, message: "User not found"})

    if(!Array.isArray(problemId)|| problemId.length === 0) throw new APIError({status: 400, message: "ProblemId must be an array"})

    const playlist = await prisma.problemsInPlaylist.deleteMany({

        where: {
            playlistId: id,
            problemId: { in: problemId } 
        }
      
    })
    return res.json( new ApiResponse({
        statusCode: 200,
        data: playlist,
        message: "Success",
      }))
})

