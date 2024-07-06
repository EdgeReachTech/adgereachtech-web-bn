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
        return { status: 401, message: "Failed to register user" };
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
        message: `user created, check email for account verification `, verificationToken
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

      if (userExist.status === "blocked")
        return {
          status: 401,
          message: "failed to login. your currently blocked to this service",
        };
      if (!userExist.isVerified || userExist.status === "pending") {
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

      const token = generateToken(userExist);

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
    if (!decodedToken) {
      return { status: 400, message: `Invalid token ${token}` };
    }

    const userId = decodedToken._id;
    try {
      const user = await User.findById(userId);
      if (!user) {
        return { status: 404, message: `User not found ${userId}` };
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
  static blockUser = async (userId: any) => {
    try {
      const user = await User.findByIdAndUpdate(userId, { status: "blocked" });
      if (!user) return { status: 400, message: "user not found" };
      if (user.status === "blocked")
        return { status: 400, message: "user already blocked" };
      if (user.status === "pending")
        return {
          status: 400,
          message: "you can block pending account. delete it instead",
        };

      return {
        status: 200,
        message: `You blocked ${user.firstName} successfully`,
      };
    } catch (error: any) {
      return { status: 500, message: `Found error ${error.message}` };
    }
  };
  static unBlockUser = async (userId: any) => {
    try {
      const user = await User.findByIdAndUpdate(userId, { status: "active" });
      if (!user) return { status: 400, message: "user not found" };
      if (user.status !== 'blocked') return { status: 400, message: "user not blocked" };
      return {
        status: 200,
        message: `You unblocked ${user.firstName} successfully`,
      };
    } catch (error: any) {
      return { status: 500, message: `Found error ${error.message}` };
    }
  };
  static changeRole = async (userId: any,role:any) => {
    try {
      const user = await User.findByIdAndUpdate(userId, { role: role});
      if (!user) return { status: 400, message: "user not found" };
      if (user.status === 'blocked') return { status: 400, message: "user is blocked" };
      return {
        status: 200,
        message: `You make ${user.firstName} ${role} successfully`,
      };
    } catch (error: any) {
      return { status: 500, message: `Found error ${error.message}` };
    }
  };
}
