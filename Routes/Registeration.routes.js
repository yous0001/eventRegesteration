import { Router } from "express"
import { authMiddleware } from "../Middlewares/auth.middleware.js";
import * as RegiseterationController from "../Controllers/Registration.controller.js"


const router=Router()


export default router