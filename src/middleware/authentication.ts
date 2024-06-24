import { NextFunction, Request, Response } from "express"
import { decodeToken } from "../utils/tokenUtils"
import { decode } from "punycode"
export const verifyToken=(req:any, res:Response, next:NextFunction)=>{
    const header = req.headers['authorization']
    const token = header.split(' ')[1]
    if(!token)
        return res.status(403).json({ message: 'No token provided' })

    if(!decodeToken(token))
        return res.status(500).json({message:'error occured login again',decode:decodeToken(token)})
    req.user = decodeToken(token)
    next()
}