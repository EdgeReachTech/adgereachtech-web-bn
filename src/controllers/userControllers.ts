import { Request, Response } from "express";
import { userService } from "../services/userServices";
import { hashingPassword } from "../utils/passwordUtils";
import User from "../models/User";
import { sendEmail } from "../helpers/sendEmail";
import { resetTemplates, verificationTemplates } from "../utils/emailTempletes";
import { decodeToken, generateToken } from "../utils/tokenUtils";
import bcrypt from "bcrypt";

export class userController {
  static registerUser = async (req: Request, res: Response) => {
    try {
      const { role, status, isVerified, verifiedAt, createdAt, ...userData } =
        req.body;
      userData["password"] = await hashingPassword(userData.password);
      const user = await userService.registerUser(userData);
      if (!user || undefined) {
        res.status(401).json({ message: "failed to register users" });
      }
      res.status(user?.status as number).json({ message: user?.message });
    } catch (error: any) {
      res.status(500).json({ error: `Error ${error.message} happened` });
    }
  };

  static login = async (req: Request, res: Response) => {
    const loginData = req.body;
    try {
      const user = await userService.login(loginData);
      if (!user) {
        return res.status(401).json({ message: "Failed to login" });
      }

      const token = user.token;

      return res.status(user.status).json({ message: user.message, token });
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

  static deleteUser = async (req: Request, res: Response) => {
    const userId = req.params.id;
    try {
      const result = await userService.deleteUser(userId);

      return res.status(result?.status).json({ message: result?.message });
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
      const email = req.body.email
      let mailOptions = {
        from: process.env.OUR_EMAIL as string,
        to: email,
        subject: "Verify Account",
        html: resetTemplates(email, generateToken(email)),
      };
      const user = await User.findOne({ email })
      if (!user)
        res.status(400).json({ message: 'user not found' })

      await sendEmail(mailOptions)
      res.status(200).json({ message: 'check your email for resetting password' })

    }
    catch (error: any) {
      res.status(500).json({ message: `Error ${error.message} happened while resetting password` })
    }
  }

  static resetPassword = async (req: Request, res: Response) => {
    try {
      const token = req.params.token
      const password = req.body.password as string
      const userData = decodeToken(token)
      const user = User.findOne({ userData })
      if (!user)
        res.status(400).json({ message: `email not found` })
      const passwordChanged = await userService.changePassword(await hashingPassword(password) as string, user)
      res.status(passwordChanged.status).json(passwordChanged.message)


    }
    catch (error: any) {
      res.status(500).json({ message: `Error ${error.message} happened while reset password` })
    }
  }

  static changeUserPassword = async (req: Request, res: Response) => {
    try {
      const token = req.params.token;
      const { currentPassword, newPassword } = req.body;

      const userData = decodeToken(token)._d;
      const user = await User.findOne(userData);
      if (!user) return res.status(401).json({ message: "Invalid call", userData: userData });

      const verifyPassword = bcrypt.compare(currentPassword, user?.password);
      if (!verifyPassword) return res.status(401).json({ message: "Invalid password" });

      const userId = user.id;
      const hashedPassword = await hashingPassword(newPassword) as string;

      const result = await userService.changePassword(hashedPassword, userId);
      res.status(401).json({ message: result.message });
    } catch (error: any) {
      res.status(500).json({ message: `Error ${error.message} happened while reset password` })
    }
  }
  // static changeUserPassword = async (req: Request, res: Response) => {
  //   try {
  //     const token = req.params.token;
  //     const { currentPassword, newPassword } = req.body;

  //     const userData = decodeToken(token)._d;
  //     const user = await User.findOne(userData);
  //     if (!user) return res.status(401).json({ message: "Invalid call", userData: userData });

  //     const verifyPassword = bcrypt.compare(currentPassword, user?.password);
  //     if (!verifyPassword) return res.status(401).json({ message: "Invalid password" });

  //     const userId = user.id;
  //     const hashedPassword = await hashingPassword(newPassword) as string;

  //     const result = await userService.changePassword(hashedPassword, userId);
  //     res.status(401).json({ message: result.message });
  //   } catch (error: any) {
  //     res.status(500).json({ message: `Error ${error.message} happened while reset password` })
  //   }
  // }

}
