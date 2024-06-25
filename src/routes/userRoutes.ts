import express from "express";
import { userController } from "../controllers/userControllers";
import { validateUser } from "../validations/userValidation";
import { verifyToken } from "../middleware/authentication";

export const userRouter = express.Router()

userRouter.post('/register', validateUser, userController.registerUser);
userRouter.post('/login', userController.login);
userRouter.put('/updateUser', verifyToken, userController.updateUser);
userRouter.delete('/delete-user/:token', userController.deleteUser);
userRouter.get('/verify-user/:token', userController.verifyUser);