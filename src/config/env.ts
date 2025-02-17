import { configDotenv } from "dotenv";

configDotenv()
interface EnvConfig {
    PORT: string;
    MONGO_URI: string;
    OUR_EMAIL: string;
    OUR_PASSWORD: string;
    SECRET_KEY: string;
    FRONT_END_URI: string;
    CLOUDINARY_NAME:string
    CLOUDINARY_KEY:string
    CLOUDINARY_SECRET:string
};

const ENVIRONMENT = process.env.ENVIRONMENT || 'DEVELOPMENT';

const doten: {
    DEVELOPMENT: EnvConfig; 
    PRODUCTION: EnvConfig;
} = {
    DEVELOPMENT: {
        CLOUDINARY_SECRET:process.env.CLOUDINARY_SECRET_DEV as string,
        CLOUDINARY_KEY:process.env.CLOUDINARY_KEY as string,
        CLOUDINARY_NAME:process.env.CLOUDINARY_NAME_DEV as string,
        PORT: process.env.PORT_DEV as string,
        MONGO_URI: process.env.MONGODB_URI_DEV as string,
        OUR_EMAIL: process.env.OUR_EMAIL_DEV as string,
        OUR_PASSWORD: process.env.OUR_PASSWORD_DEV as string,
        SECRET_KEY: process.env.SECRET_KEY_DEV as string,
        FRONT_END_URI: process.env.FRONT_END_URI_DEV as string
    },
    PRODUCTION: {
        CLOUDINARY_SECRET:process.env.CLOUDINARY_SECRET_PRODUCTION as string,
        CLOUDINARY_KEY:process.env.CLOUDINARY_KEY_PRODUCTION as string,
        CLOUDINARY_NAME:process.env.CLOUDINARY_NAME_DEV_PRODUCTION as string,
        PORT: process.env.PORT_PRODUCTION as string,
        MONGO_URI: process.env.MONGODB_URI_PRODUCTION as string,
        OUR_EMAIL: process.env.OUR_EMAIL_PRODUCTION as string,
        OUR_PASSWORD: process.env.OUR_PASSWORD_PRODUCTION as string,
        SECRET_KEY: process.env.SECRET_KEY_PRODUCTION as string,
        FRONT_END_URI: process.env.FRONT_END_URI_PRODUCTION as string
    },
};

export const env = doten[ENVIRONMENT as 'DEVELOPMENT' | 'PRODUCTION'];

