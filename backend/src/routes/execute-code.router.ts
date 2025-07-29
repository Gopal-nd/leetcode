import express from 'express'
import { userAuth } from '../middleware/auth.middleware'
import { executeCode,RunCode } from '../controllers/execute-code.controller'

const router = express.Router()


router.post('/', userAuth, executeCode)


router.post('/run', userAuth, RunCode)



export default router



