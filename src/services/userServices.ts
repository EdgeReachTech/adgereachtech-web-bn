import { sendMessage } from "../helpers/sendEmail"
import User from "../models/User"
import VerificationToken from "../models/verification"
import { verificationTemplates } from "../utils/emailTempletes"
import { comparePassword } from "../utils/passwordUtils"
import { decodeToken, generateToken, generateVerificationToken } from "../utils/tokenUtils"

export class userService {

  static registerUser = async (user: any) => {
    try {
      const userExist = await User.findOne({ email: user.email });
      if (userExist) {
        return ({ status: 401, message: 'user already exists' })
      }

      const createdUser = await User.create(user)
      if (!createdUser) {
        return ({ status: 401, message: 'failed to register user' })
      }

      const verificationToken = await generateVerificationToken(createdUser.email);

      let mailOptions = {
        from: process.env.OUR_EMAIL as string,
        to: createdUser.email,
        subject: 'Verify Account',
        html: verificationTemplates(createdUser, verificationToken.token)
      };
      await sendMessage(mailOptions);

      return ({ status: 200, message: `user created, check email for account verification ` })
    }
    catch (error: any) {
      console.log(error)
    }
  }

  static login = async (loginData: any) => {
    try {
      const userExist = await User.findOne({ email: loginData.email });
      if (!userExist) {
        return { status: 401, message: 'User does not exist' };
      }

      const passwordMatch = await comparePassword(loginData.password, userExist.password);
      if (!passwordMatch) {
        return { status: 401, message: 'Invalid credentials' };
      }

      if (!userExist.isVerified) {
        const verificationToken = await generateVerificationToken(userExist.email);
        let mailOptions = {
          from: process.env.OUR_EMAIL as string,
          to: userExist.email,
          subject: 'Verify Account',
          html: verificationTemplates(userExist, verificationToken.token)
        };
        await sendMessage(mailOptions);
        return { status: 200, message: 'check email for account verification' };
      }

      const token = generateToken(userExist);
      const decoded = decodeToken(token);

      return { status: 200, message: 'Logged in successfully', decoded };
    } catch (error: any) {
      console.error(error);
      return { status: 500, message: `Error: ${error.message}` };
    }
  }

  static updateUser = async (userId: string, updatedData: any) => {
    // Exclude email and password from updatedData
    const { email, password, ...filteredData } = updatedData;
    try {
      const user = await User.findByIdAndUpdate(userId, filteredData, { new: true });
      if (!user) {
        return { status: 404, message: 'User not found' };
      }

      return { status: 200, message: 'User updated successfully', user };
    } catch (error: any) {
      return { status: 500, message: `Error: ${error.message}` };
    }
  }

  static deleteUser = async (userId: string) => {
    try {
      const user = await User.findByIdAndDelete(userId);
      if (!user) {
        return { status: 404, message: 'User not found' };
      }

      return { status: 200, message: 'User deleted successfully' };
    } catch (error: any) {
      return { status: 500, message: `Error: ${error.message}` }
    }
  }

  static verifyUser = async (userId: string, token: string) => {
    try {
      const user = await User.findById(userId);
      if (!user) {
        return { status: 404, message: 'User not found' };
      }

      const verificationToken = await VerificationToken.findOne({ email: user.email, token });
      if (!verificationToken) {
        return { status: 400, message: 'Invalid or missing verification token' };
      }

      if (verificationToken.expiresAt < new Date()) {
        return { status: 400, message: 'Verification token has expired' };
      }

      if (user.isVerified) {
        return { status: 400, message: 'User is already verified' };
      }

      user.isVerified = true;
      user.verifiedAt = new Date();
      await user.save();
      await VerificationToken.deleteOne({ email: user.email, token }); // Optionally delete the token after verification

      return { status: 200, message: 'User verified successfully' };
    } catch (error) {
      return { status: 500, message: `Error: ${error} happened` }
    }
  }
}