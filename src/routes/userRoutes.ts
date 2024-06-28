import express from "express";
import { userController } from "../controllers/userControllers";
import { validateChangeUserPassword, validateUser } from "../validations/userValidation";
import { isLoggedIn } from "../middleware/authentication";

export const userRouter = express.Router();

userRouter.post("/register", validateUser, userController.registerUser);
userRouter.post("/login", userController.login);
userRouter.put("/update", isLoggedIn, userController.updateUser);
userRouter.delete("/delete/:id", userController.deleteUser);
userRouter.get("/verify/:token", userController.verifyUser);
userRouter.get("/forgotPassword", userController.forgotPassword)
userRouter.patch("/resetPassword/:token", userController.resetPassword)
userRouter.patch("/changePassword", isLoggedIn, validateChangeUserPassword, userController.changeUserPassword);
userRouter.patch("/resetPassword/:token", userController.resetPassword)
