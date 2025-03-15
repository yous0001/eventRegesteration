import { Router } from "express"
import { authMiddleware } from "../Middlewares/auth.middleware.js";
import * as RegiseterationController from "../Controllers/Registeration.controller.js"
import { systemRoles } from "../Utils/enums.utils.js";


const router=Router()

router.post("/register/:eventId", authMiddleware(), RegiseterationController.register);
router.delete("/cancelRegistration/:registrationId", authMiddleware(), RegiseterationController.cancelRegistration);
router.get("/eventRegistrations/:eventId", authMiddleware([systemRoles.admin]), RegiseterationController.getRegistrationsByEvent);

export default router