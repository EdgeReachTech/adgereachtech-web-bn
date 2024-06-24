import express from "express";
import { userController } from "../controllers/userControllers";
import { validateUser } from "../validations/userValidation";

export const userRouter = express.Router()

userRouter.post('/register', validateUser, userController.registerUser);