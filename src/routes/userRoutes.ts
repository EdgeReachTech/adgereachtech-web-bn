import express from "express";
import { userController } from "../controllers/userControllers";
import { validateUser } from "../validations/userValidation";

export const userRouter = express.Router()

userRouter.post('/register', userController.registerUser);
userRouter.get('/log-in', userController.login);
userRouter.put('/update-user/:id', userController.updateUser);
userRouter.delete('/delete-user/:id', userController.deleteUser);
userRouter.get('/verify-user/:id', userController.verifyUser);
userRouter.post('/register', validateUser, userController.registerUser);
