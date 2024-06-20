import express from "express";
import { userController } from "../controllers/userControllers";

export const userRouter = express.Router()

userRouter.post('/register', userController.registerUser)