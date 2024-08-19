import express from "express";
import { userController } from "../controllers/userControllers";
import { validateChangeUserPassword, validateRole, validateUser } from "../validations/userValidation";
import { isLoggedIn } from "../middleware/authentication";
import { isAdmin } from "../middleware/authorisation";

export const userRouter = express.Router();

userRouter.post("/register", validateUser, userController.registerUser);
userRouter.post("/login", userController.login);
userRouter.put("/update", isLoggedIn, userController.updateUser);
userRouter.delete("/delete/:id", userController.deleteUser);
userRouter.get("/verify/:token", userController.verifyUser);
userRouter.get("/forgot-password", userController.forgotPassword)
userRouter.patch("/reset-password/:token", userController.resetPassword)
userRouter.patch("/change-password/:token", isLoggedIn, validateChangeUserPassword, userController.changeUserPassword);
userRouter.get('/logged-user',isLoggedIn,userController.getUSer)
userRouter.patch('/block/:id', isLoggedIn, isAdmin, userController.blockUser)
userRouter.patch('/unblock/:id', isLoggedIn, isAdmin, userController.unBlockuser)
userRouter.patch('/changerole/:id', validateRole, isLoggedIn, isAdmin, userController.changeRole)
 

