import jwt from 'jsonwebtoken'


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