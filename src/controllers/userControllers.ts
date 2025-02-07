import { Request, Response } from "express";
import { userService } from "../services/userServices";
import { hashingPassword } from "../utils/passwordUtils";
import User from "../models/User";
import { sendEmail } from "../helpers/sendEmail";
import { decodeToken, generateToken } from "../utils/tokenUtils";
import bcrypt from "bcrypt";
import { resetTemplates } from "../utils/emailTempletes";
 
export class userController {
  static registerUser = async (req: Request, res: Response) => {
    try {
      const { role, status, isVerified, verifiedAt, createdAt, ...userData } =
        req.body;
      userData["password"] = await hashingPassword(userData.password);
      const user = await userService.registerUser(userData);
      if (!user) {
        return res.status(400).json({ message: "Failed to register users" });
      }
      res.status(user.status as number).json({ message: user?.message });
    } catch (error: any) {
      res.status(500).json({ error: `Error ${error.message} happened` });
    } 
  };

  static login = async (req: Request, res: Response) => {
    const loginData = req.body;
    try {
      const user = await userService.login(loginData);
      if (!user) {
        return res.status(400).json({ message: "Failed to login! try gain" });
      }

      if(user.status===200){
       return res.status(user.status).json({message:user.message,token:user.token})
      }
      return res.status(user.status).json({ message: user.message });
    } catch (error: any) {
      return res.status(500).json({ error: `Error ${error.message} happened` });
    }
  };

  static updateUser = async (req: any, res: Response) => {
    try {
      const user = req.user;
      const updatedData = req.body;

      const {
        role,
        status,
        isVerified,
        verifiedAt,
        createdAt,
        email,
        password,
        ...filteredData
      } = updatedData;

      const result = await userService.updateUser(user, filteredData);
      return res
        .status(result.status)
        .json({ message: result.message, user: result.user });
    } catch (error: any) {
      return res.status(500).json({ error: `Error ${error.message} happened` });
    }
  };

  static getAllUser = async (req: any, res: Response) => {
    try {
      const user = await User.find();
      res.status(200).json(user);
    } catch (error:any) {
      res.status(500).json({message:error.message})
    }
  };
  static getUSer = async (req: any, res: Response) => {
   try {
     const user = await User.findOne({ email: req.user.email });
     if (!user) {
       res.status(404).json({ message: "user data not found" });
     }
     res.status(200).json(user);
   } catch (error:any) {
    res.status(500).json({message:error.message})
   }
  };

  static deleteUser = async (req: Request, res: Response) => {
    const userId = req.params.id;
    try {
      const result = await userService.deleteUser(userId);

      return res.status(result.status).json({ message: result.message });
    } catch (error) {
      return res.status(500).json({ error: `Error ${error} happened` });
    }
  };

  static verifyUser = async (req: Request, res: Response) => {
    const token = req.params.token;
    try {
      const result = await userService.verifyUser(token);
      if (!result)
        return res.status(404).json({ message: "User not found here" });

      return res.status(result?.status).json({ message: result?.message });
    } catch (error) {
      return res.status(500).json({ error: `Error ${error} happened` });
    }
  };

  static forgotPassword = async (req: Request, res: Response) => {
    try {
      const email = req.body.email;

      let mailOptions = {
        from: process.env.OUR_EMAIL as string,
        to: email,
        subject: "Verify Account",
        html: resetTemplates(email, generateToken(email)),
      };
      const user = await User.findOne({ email });
      if (!user) res.status(400).json({ message: "user not found" });

      await sendEmail(mailOptions);
      res
        .status(200)
        .json({ message: "check your email for resetting password" });
    } catch (error: any) {
      res
        .status(500)
        .json({
          message: `Error ${error.message} happened while resetting password`,
        });
    }
  };

  static resetPassword = async (req: Request, res: Response) => {
    try {
      const token = req.params.token;
      const password = req.body.password as string;
      const userData = decodeToken(token);
      const user = User.findOne({ userData });
      if (!user) res.status(400).json({ message: `email not found` });
      const passwordChanged = await userService.changePassword(
        (await hashingPassword(password)) as string,
        user
      );
      res.status(passwordChanged.status).json(passwordChanged.message);
    } catch (error: any) {
      res
        .status(500)
        .json({
          message: `Error ${error.message} happened while reset password`,
        });
    }
  };

  static blockUser = async (req: any, res: Response) => {
    try {
      const userId = req.params.id;
      const blockUser = await userService.blockUser(userId);
      if (!blockUser) res.status(400).json({ message: "failed to block user" });
      res.status(blockUser.status).json({ message: blockUser.message });
    } catch (error: any) {
      res.status(500).json({ message: `Found error ${error.message}` });
    }
  };
  static unBlockuser = async (req: any, res: Response) => {
    try {
      const userId = req.params.id;
      const blockUser = await userService.unBlockUser(userId);
      if (!blockUser)
        res.status(400).json({ message: "failed to unblock user" });
      res.status(blockUser.status).json({ message: blockUser.message });
    } catch (error: any) {
      res.status(500).json({ message: `Found error ${error.message}` });
    }
  };
  static changeRole = async (req: any, res: Response) => {
    try {
      const userId = req.params.id;
      const role = req.body.role;
      const changeRole = await userService.changeRole(userId, role);
      if (!changeRole)
        res.status(400).json({ message: "failed to unblock user" });
      res.status(changeRole.status).json({ message: changeRole.message });
    } catch (error: any) {
      res.status(500).json({ message: `Found error ${error.message}` });
    }
  };

  static changeUserPassword = async (req: any, res: Response) => {
    try {
      const { currentPassword, newPassword } = req.body;
      const user = req.user;
      if (!user) return res.status(401).json({ message: "Invalid call" });
      const userData = await User.findById(user._id);

      if (!userData) {
        return res.status(402).json({ message: "user not found" });
      }
      const verifyPassword = await bcrypt.compare(
        currentPassword,
        userData.password
      );
      if (!verifyPassword)
        return res.status(401).json({ message: "Invalid current password" });

      const hashedPassword = (await hashingPassword(newPassword)) as string;

      const result = await userService.changePassword(hashedPassword, userData);
      res.status(result.status).json({ message: result.message });
    } catch (error: any) {
      res.status(500).json({
        message: `Error ${error.message} happened while reset password`,
      });
    }
  };
}
