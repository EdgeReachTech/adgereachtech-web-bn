import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid';
import VerificationToken from '../models/verification';

export const generateVerificationToken = async (email: string) => {
    const token = uuidv4();
    const expiresAt = new Date(Date.now() + 3600 * 1000); // 1 hour from now

    const existingToken = await VerificationToken.findOne({ email });
    if (existingToken) {
        await VerificationToken.deleteOne({ email });
    }

    const verificationToken = new VerificationToken({
        email,
        token,
        expiresAt
    });

    await verificationToken.save();
    return verificationToken;
};


export const generateToken = (user: any) => {
    const token = jwt.sign({ user }, process.env.SECRET_KEY as string, { expiresIn: '24h' })
    return token;
}

export const decodeToken = (token: any) => {
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY!);
        return decoded;
    } catch (error) {
        return null;
    }
};