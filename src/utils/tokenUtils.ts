import jwt from 'jsonwebtoken'

export const generateToken = (user:any)=>{
const token  =jwt.sign({ user }, process.env.SECRET_KEY as string, { expiresIn: '24h' })
return token
}
