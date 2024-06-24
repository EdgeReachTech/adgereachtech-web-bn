import jwt from 'jsonwebtoken'


export const generateToken = (user: any) => {
    try{
    const token = jwt.sign({ user }, process.env.SECRET_KEY as string, { expiresIn: '24h' })
    return token;
}
catch(error:any){
    return ({status:500, messag:`Error: ${error.message} happened`})
}
}

export const decodeToken = (token: any) => {
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY as string);
        return decoded;
    } catch (error) {
       console.log(error, token)
    }
};