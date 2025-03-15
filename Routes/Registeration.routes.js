import { Router } from "express"
import { authMiddleware } from "../Middlewares/auth.middleware.js";
import * as RegiseterationController from "../Controllers/Registeration.controller.js"


const router=Router()

router.post("/register/:eventId", authMiddleware(), RegiseterationController.register);

export default router