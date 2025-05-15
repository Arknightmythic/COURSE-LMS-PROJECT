import express from "express";
import { signInSchema, signUpSchema } from "../utils/schema.js";
import { signInAction, signUpAction } from "../controller/authController.js";
import { validateRequest } from "../middleware/validateRequest.js";

const authRoutes = express.Router()

authRoutes.post('/sign-up', validateRequest(signUpSchema), signUpAction)
authRoutes.post('/sign-in',validateRequest(signInSchema), signInAction)


export default authRoutes