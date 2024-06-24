import { NextFunction, Request, Response } from "express"
import jwt from 'jsonwebtoken'
import { decodeToken } from "../utils/tokenUtils"
export const verifyToken=(req:any, res:Response, next:NextFunction)=>{
    const token = req.headers['authorization']
    if(!token)
        return res.status(403).json({ message: 'No token provided' })

    if(!decodeToken(token))
        return res.status(500).json({message:'error occured login again'})
    req.user = decodeToken(token)
    next()
}