import express from "express";
import { userController } from "../controllers/userControllers";
import auth from "../middleware/authorisation";

export const userRouter = express.Router()

userRouter.post('/register', userController.registerUser);
userRouter.get('/log-in', userController.login);
userRouter.put('/update-user/:id',auth, userController.updateUser);
userRouter.delete('/delete-user/:id', userController.deleteUser);
userRouter.get('/verify-user/:id', userController.verifyUser);
