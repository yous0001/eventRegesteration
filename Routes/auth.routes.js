import { Router } from "express";
import * as  authController from "../Controllers/auth.contorller.js"

const router=Router()

router.post('/register',authController.register) 
