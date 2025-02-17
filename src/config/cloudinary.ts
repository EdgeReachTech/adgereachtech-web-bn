import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import { env } from "./env";

dotenv.config();

cloudinary.config({
  cloud_name: env.CLOUDINARY_NAME || "",
  api_key: env.CLOUDINARY_KEY || "",
  api_secret: env.CLOUDINARY_SECRET || "",
});
console.log(env.CLOUDINARY_KEY)
export default cloudinary;
