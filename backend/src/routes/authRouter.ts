import express from 'express';

import {  userAuth } from '../middleware/auth.middleware';

import { emailVerify, getProfile, login, logout, register, resendOtp, ResetPassword, validate } from '../controllers/auth.controller';

const router = express.Router();
router.post('/sign-up', register);
router.post('/sign-in', login);
router.post('/reset', ResetPassword);
router.post('/logout', logout);
router.post('/verify-email', emailVerify );
router.post('/send-otp',resendOtp)

router.get('/validate',validate)

// router.get('/verify-token', userAuth, verifyToken);
// router.get('/logout', authenticateToken, logout);
router.get('/me',userAuth,getProfile)


export default router;