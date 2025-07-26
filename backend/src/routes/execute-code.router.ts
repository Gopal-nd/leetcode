import express from 'express'
import { userAuth } from '../middleware/auth.middleware'
import { executeCode } from '../controllers/execute-code.controller'

const router = express.Router()


router.post('/', userAuth, executeCode)


export default router



