import { JwtPayload } from "jsonwebtoken";
import { sendEmail } from "../helpers/sendEmail";
import User from "../models/User";
import { verificationTemplates } from "../utils/emailTempletes";
import { comparePassword } from "../utils/passwordUtils";
import { decodeToken, generateToken } from "../utils/tokenUtils";

export class userService {
  static registerUser = async (user: any) => {
    try {
      const userExist = await User.findOne({ email: user.email });
      if (userExist) {
        return { status: 401, message: "user already exists" };
      }

      const createdUser = await User.create(user);
      if (!createdUser) {
        return { status: 401, message: "failed to register user" };
      }

      const verificationToken = generateToken(createdUser);

      let mailOptions = {
        from: process.env.OUR_EMAIL as string,
        to: createdUser.email,
        subject: "Verify Account",
        html: verificationTemplates(createdUser, verificationToken),
      };
      await sendEmail(mailOptions);

      return {
        status: 200,
        message: `user created, check email for account verification `,
      };
    } catch (error: any) {
      console.log(error);
    }
  };

  static login = async (loginData: any) => {
    try {
      const userExist = await User.findOne({ email: loginData.email });
      if (!userExist) {
        return { status: 401, message: "User does not exist" };
      }

      const passwordMatch = await comparePassword(
        loginData.password,
        userExist.password
      );
      if (!passwordMatch) {
        return { status: 401, message: "Invalid credentials" };
      }

      if (!userExist.isVerified) {
        const verificationToken = generateToken({
          _id: userExist._id,
          email: userExist.email,
        });
        let mailOptions = {
          from: process.env.OUR_EMAIL as string,
          to: userExist.email,
          subject: "Verify Account",
          html: verificationTemplates(userExist, verificationToken),
        };
        await sendEmail(mailOptions);
        return {
          status: 200,
          message:
            "your are not verified. check email for account verification",
        };
      }

      const user = {
        _id: userExist._id,
        email: userExist.email,
      };
      const token = generateToken(user);

      return { status: 200, message: "Logged in successfully", token };
    } catch (error: any) {
      console.error(error);
      return { status: 500, message: `Error: ${error.message}` };
    }
  };

  static updateUser = async (userData: any, updatedData: any) => {
    try {
      const user = await User.findByIdAndUpdate(userData._id, updatedData, {
        new: true,
      });
      if (!user) {
        return { status: 404, message: "User not found" };
      }

      return { status: 200, message: "User updated successfully", user };
    } catch (error: any) {
      return { status: 500, message: `Error: ${error.message}` };
    }
  };

  static deleteUser = async (userId: string) => {
    try {
      const user = await User.findByIdAndDelete(userId);
      if (!user) {
        return { status: 404, message: "User not found" };
      }

      return { status: 200, message: "User deleted successfully" };
    } catch (error: any) {
      return { status: 500, message: `Error: ${error.message}` };
    }
  };

  static verifyUser = async (token: any) => {
    const decodedToken = decodeToken(token) as JwtPayload;
    if (!decodedToken || !decodedToken.user || !decodedToken.user._id) {
      return { status: 400, message: "Invalid token" };
    }

    const userId = decodedToken.user._id;
    try {
      const user = await User.findById(userId);
      if (!user) {
        return { status: 404, message: "User not found" };
      }

      const verificationToken = generateToken(user);
      if (!verificationToken) {
        return {
          status: 400,
          message: "Invalid or missing verification token",
        };
      }

      if (user.isVerified) {
        return { status: 400, message: "User is already verified" };
      }
      user.status = "active";
      user.isVerified = true;
      user.verifiedAt = new Date();
      await user.save();

      return { status: 200, message: "User verified successfully" };
    } catch (error) {
      return { status: 500, message: `Error: ${error} happened` };
    }
  };

  static changePassword = async (newpassword: string, userData: any) => {
    try {
      const user = await User.findOneAndUpdate(userData._id, {
        password: newpassword,
      });
      if (!user) return { status: 404, message: "user not found" };
      return { status: 200, message: `password changed succesfully ` };
    } catch (error: any) {
      return {
        status: 500,
        message: `Error ${error.message} happened while changing password`,
      };
    }
  };
}
