import type { NextFunction, Request, Response } from "express";
import { auth } from "../../auth";
import { fromNodeHeaders } from "better-auth/node";
import type { Role } from "@prisma/client";

export async function userAuth(req:Request,res:Response,next:NextFunction) {
    try {
        
        const session = await auth.api.getSession({
            headers: fromNodeHeaders(req.headers)
        })
        if(!session) {
            return res.status(401).json({
                message: "Unauthorized, only authenticated users can access this route"
            })
        }
        req.user = session.user;
    } catch (error) {
        console.log("error in the auth middleware",error)
    }
    next()
}


export async function adminAuth(req:Request,res:Response,next:NextFunction) {
        const session = await auth.api.getSession({
        headers: fromNodeHeaders(req.headers)
    })
    if (!session || (session.user?.role as Role) !== "ADMIN") {
        return res.status(403).json({
            message: "access denied, only admin can access this route"
        })
    }
    req.user = session.user
    next()
}