import jwt, { JwtPayload } from 'jsonwebtoken'


export const generateToken = (user: any): string | { status: number; message: string } => {
    try {
        const token = jwt.sign({ user }, process.env.SECRET_KEY as string, { expiresIn: '24h' })
        return token;
    }
    catch (error: any) {
        return ({ status: 500, message: `Error: ${error.message} happened` })
    }
}

export const decodeToken = (token: string) => {
    console.log('Token received for decoding:', token);
    if (typeof token !== 'string') {
        console.log('Token is not a string:', token);
        return null;
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY as string);
        return decoded;
    } catch (error) {
        console.log('Error decoding token:', error);
        return null;
    }
};

export const getUserToken = (token: string) => {
    if (typeof token !== 'string') {
        return null;
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY as string);
        return decoded as JwtPayload;
    } catch (error) {
        return null;
    }
};