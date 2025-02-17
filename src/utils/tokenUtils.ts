import jwt, { JwtPayload } from "jsonwebtoken";
import { env } from "../config/env";

export const generateToken = (user: any) => {
  try {
    const token = jwt.sign({ user }, env.SECRET_KEY as string, {
      expiresIn: "24h",
    });
    return token;
  } catch (error: any) {
    console.log(error)
      return null
      
  }
};

export const decodeToken = (token: string) => {
  if (typeof token !== "string") {
    return null;
  }

  try {
    const decoded:JwtPayload = jwt.verify(token, env.SECRET_KEY as string) as JwtPayload;
    return decoded.user;
  } catch (error) {
    return null;
  }
};
