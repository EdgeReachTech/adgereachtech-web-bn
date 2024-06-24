import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// types.d.ts or custom.d.ts
declare module "express-serve-static-core" {
    interface Request {
        userId?: string;
    }
}


const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ error: "Authorization header is missing" });
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({ error: "Token is missing" });
        }

        const isCustomAuth = token.length < 500; // Assuming custom auth tokens are shorter

        let decodedData;

        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, process.env.SECRET_KEY!);
            req.userId = (decodedData as { id: string }).id;
        } else {
            decodedData = jwt.decode(token);
            req.userId = (decodedData as { sub: string })?.sub;
        }

        next();
    } catch (error: any) {
        return res.status(500).json({ error: `${error.message}` });
    }
};

export default auth;
