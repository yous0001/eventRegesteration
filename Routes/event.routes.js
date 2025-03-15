import { Router } from "express";
import { authMiddleware } from "../Middlewares/auth.middleware.js";
import { systemRoles } from "../Utils/enums.utils.js";
import * as eventController from "../Controllers/event.controllers.js"

const router=Router()

router.post("/create",authMiddleware([systemRoles.admin]),eventController.createEvent)
router.put("/update/:eventId",authMiddleware([systemRoles.admin]),eventController.updateEvent)
router.delete("/delete/:eventId",authMiddleware([systemRoles.admin]),eventController.deleteEvent)
router.get("/",eventController.getEvents)

export default router