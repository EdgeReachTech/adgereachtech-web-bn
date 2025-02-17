import nodemailer from "nodemailer";
import { Options } from "nodemailer/lib/mailer";
import { env } from "../config/env";

export const sendEmail = async (mailOptions: Options) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: env.OUR_EMAIL as string,
        pass: env.OUR_PASSWORD as string,
      },
    });

    await transporter.sendMail(mailOptions);
  } catch (error: any) {
    return error.message;
  }
};
