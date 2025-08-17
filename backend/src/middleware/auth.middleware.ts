import { ApiResponse } from '../utils/api-response';
import type { JwtPayload } from 'jsonwebtoken';
import { verifyToken } from '../lib/jwt';
import type { NextFunction, Request, Response } from "express";

function parseCookies(cookieHeader:any) {
  if (!cookieHeader) return {};
  return cookieHeader.split(";").reduce((acc:any, cookie:any) => {
    const [key, value] = cookie.trim().split("=");
    acc[key] = value;
    return acc;
  }, {});
}



export const userAuth = (req: any, res: Response, next: NextFunction): void => {

  let  token =  parseCookies(req.headers.cookie).token

  if (!token) {
    res.status(401).json({ message: 'Access Denied' });
    return;
  }

  try {
    const decoded = verifyToken(token)
    req.user = decoded;
    next(); // Ensure next() is called for successful verification
  } catch (error) {
    res.status(403).json({ message: 'Invalid Token' });
  }
};








export const adminAuth = (req: any, res: Response, next: NextFunction): void => {
  let  token =  parseCookies(req.headers.cookie).token

  if (!token) {
    res.status(401).json(new ApiResponse({data:null,statusCode:500,message:"Access Denied"}))

    return;
  }

  try {
    const decoded = verifyToken(token) as JwtPayload 

    if (!decoded || typeof decoded !== "object" || !decoded.role) {
        res.status(403).json(new ApiResponse({ data: null, statusCode: 403, message: "Unauthorized: Invalid token or role missing" }));
      }
  
      if (decoded.role !== "ADMIN") {
        res.status(403).json(new ApiResponse({ data: null, statusCode: 403, message: "Forbidden: Admin access required" }));
      }

    req.user = decoded;
    next(); 
  } catch (error) {
    res.status(403).json(new ApiResponse({data:null,statusCode:500,message:"something went wrong in Admin Middleware"}))
  }
};


