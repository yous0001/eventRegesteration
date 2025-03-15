import { Router } from "express";
import * as  authController from "../Controllers/auth.contorller.js"
import { authMiddleware } from "../Middlewares/auth.middleware.js";

const router=Router()

router.post('/register',authController.register) 
router.get('/verify-email',authController.verifyEmail) 
router.post('/login',authController.login)
router.get('/profile',authMiddleware(),authController.getProfile)

export default router