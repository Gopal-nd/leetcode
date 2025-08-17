
import bcrypt from 'bcryptjs';
import { type Request ,type Response } from 'express';
import jwt  from 'jsonwebtoken'
import asyncHandler from '../utils/async-handler';
import { APIError } from '../utils/api-error';
import { ApiResponse } from '../utils/api-response';
import { Readable } from 'stream';
import fs from 'fs/promises'
import prisma from '../lib/db';
import { sendEmail } from '../lib/mail';
import { generateToken } from '../lib/jwt';


export const register = asyncHandler(async (req: Request, res: Response) => {
  const { email, password, name } = req.body;
  
  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {

    throw new APIError({status:400,message:"User already exist"})
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const Role = process.env.ADMIN_EMAIL === email ? "ADMIN" : "USER";
  const user  = await prisma.user.create({
    data:{
      email : email ,
      password:hashedPassword,
      name:name ,
      emailVerified:false,
      role:Role

    },
    select:{
      id: true,
      email: true,
      name: true,
      role: true
    }
  })

  const userOtp = await prisma.otpVerification.findUnique({where:{email}})
      
      if(userOtp){
        await prisma.otpVerification.delete({where:{email}}) 
      }
      
      // 6 digit otp
      const newUserOtp =( Math.floor(Math.random() * 900000) + 100000)
      console.log(newUserOtp)
      
      const otpExpiration = new Date(Date.now() + 5 * 60 * 1000); // 15 minutes from now
      
      const otpVerification = await prisma.otpVerification.create({
        data: {
          email: email,
          otp: newUserOtp,
          otpExpiresAt: otpExpiration
        },
        select:{
          id: true,
          email: true
        }
      });
      const mailresponse = await sendEmail(email, 'OTP Verification', `Your OTP is: ${newUserOtp}`);


  res.status(201).json(new ApiResponse({data:user,statusCode:201,message:"User created successfully"}));
})

export const login = asyncHandler(async (req: Request, res: Response) => {
   const { email, password } = req.body;

 
   const user = await prisma.user.findUnique({ where: { email } });

   if (!user){
    throw new APIError({status:401,message:"Invalid credentials"})
   }

      if (!user.emailVerified){
         const user = await prisma.otpVerification.findUnique({where:{email}})
      
      if(user){
        await prisma.otpVerification.delete({where:{email}}) 
      }
      
      // 6 digit otp
      const userOtp =( Math.floor(Math.random() * 900000) + 100000)
      console.log(userOtp)
      
      const otpExpiration = new Date(Date.now() + 5 * 60 * 1000); // 15 minutes from now
      
      const otpVerification = await prisma.otpVerification.create({
        data: {
          email: email,
          otp: userOtp,
          otpExpiresAt: otpExpiration
        },
        select:{
          id: true,
          email: true
        }
      });
      const mailresponse = await sendEmail(email, 'OTP Verification', `Your OTP is: ${userOtp}`);
        res.redirect(process.env.FRONTEND_URL + '/verify-email')
      }
 
   const isMatch = await bcrypt.compare(password, user.password);
 
   if (!isMatch) {
    throw new APIError({status:401,message:"Invalid credentials"})
  }

   const token = generateToken(user.id, user.role);

   res.cookie('token',token,{
     maxAge: 1000 * 60 * 60 * 24, 
     httpOnly:true,
     secure:true,
      domain: ".opentoolbox.site", 
     sameSite:'none'
   })

   const sendUser = {
    name:user.name,
    id:user.id,
    role:user.role,
    email:user.email
   }

   res.status(200).json(new ApiResponse({data:{sendUser,token},statusCode:200,message:'Login Success'}));


})


export const ResetPassword = asyncHandler(async (req: Request, res: Response) => {

    const {email ,otp , password } = req.body
    
    const exist  = await  prisma.user.findUnique({where:{email}})
    if(!exist){
      throw new APIError({status:401,message:'Invalid email'})
    }

    if(email && otp && !password){
      const user = await prisma.otpVerification.findUnique({where:{email}})
      if(!user){
        throw new APIError({status:401,message:'Invalid email'})
      }
      const time = user?.otpExpiresAt
      const currentTime = new Date()

      if(time < currentTime){
        await prisma.otpVerification.delete({where:{email}})
        throw new APIError({status:401,message:'OTP Expired try again later'})
      }

      const isMatch = Number(otp) === user.otp

      if(!isMatch){
        throw new APIError({status:401,message:'Invalid OTP'})
      }

      res.status(200).json(new ApiResponse({data:'',statusCode:200,message:' create the new password now'}));
    }

    if(email && password && otp){ 

      const user = await prisma.otpVerification.findUnique({where:{email}})
      if(!user){
        throw new APIError({status:401,message:'Invalid email'})
      }
      const time = user?.otpExpiresAt
      const currentTime = new Date()

      if(time < currentTime){
        await prisma.otpVerification.delete({where:{email}})
        throw new APIError({status:401,message:'OTP Expired try again later'})
      }

      const isMatch = Number(otp) === user.otp

      if(!isMatch){
        throw new APIError({status:401,message:'Invalid OTP'})
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await prisma.user.update({
        where:{email},
        data:{password:hashedPassword}
      })

      await prisma.otpVerification.delete({where:{email}})

      res.status(200).json(new ApiResponse({data:'',statusCode:200,message:'Password reset successfully'}));
    }

    if(email && !otp && !password){

      
      const user = await prisma.otpVerification.findUnique({where:{email}})
      
      if(user){
        await prisma.otpVerification.delete({where:{email}}) 
      }
      
      // 6 digit otp
      const userOtp =( Math.floor(Math.random() * 900000) + 100000)
      console.log(userOtp)
      
      const otpExpiration = new Date(Date.now() + 5 * 60 * 1000); // 15 minutes from now
      
      const otpVerification = await prisma.otpVerification.create({
        data: {
          email: email,
          otp: userOtp,
          otpExpiresAt: otpExpiration
        },
        select:{
          id: true,
          email: true
        }
      });
      const mailresponse = await sendEmail(email, 'OTP Verification', `Your OTP is: ${userOtp}`);
      
      otpVerification && res.status(200).json(new ApiResponse({data:'',statusCode:200,message:'OTP sent successfully'}));
    }

 
})

export const resendOtp = asyncHandler(async (req: Request, res: Response) => {

    const {email} = req.query as {email:string}
      
      const user = await prisma.otpVerification.findUnique({where:{email}})
      
      if(user){
        await prisma.otpVerification.delete({where:{email}}) 
      }
      
      // 6 digit otp
      const userOtp =( Math.floor(Math.random() * 900000) + 100000)
      
      const otpExpiration = new Date(Date.now() + 5 * 60 * 1000); // 15 minutes from now
      
      const otpVerification = await prisma.otpVerification.create({
        data: {
          email: email,
          otp: userOtp,
          otpExpiresAt: otpExpiration
        },
        select:{
          id: true,
          email: true
        }
      });
      const mailresponse = await sendEmail(email, 'OTP Verification', `Your OTP is: ${userOtp}`);
      
  res.status(200).json(new ApiResponse({data:'',statusCode:200,message:'OTP sent successfully'}));
    
})

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      domain: ".opentoolbox.site",
      path: "/",   // must match login
    });
    return res.status(200).json(new ApiResponse({
      statusCode: 200,
      data: null,
      message: "Logged out successfully"
    }));
  } catch (error) {

    return res.status(500).json(new ApiResponse({
      statusCode: 500,
      data: null,
      message: "Error during logout"
    }));
  }
};


export const emailVerify = asyncHandler(async (req: Request, res: Response) => {
  const { email,otp } = req.body;
  const user = await prisma.otpVerification.findUnique({where:{email}})
      if(!user?.email){
        throw new APIError({status:401,message:'Invalid email'})
      }
      const time = user?.otpExpiresAt
      const currentTime = new Date()

      if(time < currentTime){
        await prisma.otpVerification.delete({where:{email}})
        throw new APIError({status:401,message:'OTP Expired try again later'})
      }

      const isMatch = Number(otp) === user.otp

      if(!isMatch){
        throw new APIError({status:401,message:'Invalid OTP'})
      }

      await prisma.user.update({
        where:{email},
        data:{emailVerified:true}
      })

      await prisma.otpVerification.delete({where:{email}})

  res.status(200).json(new ApiResponse({data:'',statusCode:200,message:'Email verified successfully'}));
})

export const validate = asyncHandler(async (req: Request, res: Response) => {
  
    const token = req.cookies?.token || req.headers.cookie?.split('=')[1];


    if (!token) {
      throw new APIError({ status: 401, message: 'Token Not Provided' });
    }


    // Verify token using JWT
    const decoded = jwt.verify(token, process.env.SECRET_KEY as string) as { role: string };
    res.status(200).json(new ApiResponse({ statusCode: 200, data: {role:decoded.role}, }));
})

export const getProfile = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id; // Assuming authenticated user
  if (!userId) {
    throw new APIError({ status: 401, message: 'Unauthorized: No User ID' });
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    throw new APIError({ status: 404, message: 'User not found' });
  }

  res.status(200).json(new ApiResponse({ statusCode: 200, data: user }));
});

