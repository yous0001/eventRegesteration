import { Router } from "express";
import { authMiddleware } from "../Middlewares/auth.middleware.js";
import { systemRoles } from "../Utils/enums.utils.js";
import * as eventController from "../Controllers/event.controllers.js"

const router=Router()

router.post("/create",authMiddleware([systemRoles.admin]),eventController.createEvent)


export default router