
 import { NextFunction, Request, Response } from "express";
 export const isAdmin = (req: any, res: Response, next: NextFunction) => {
  const user = req.user
  if(!user){
    res.status(401).json({message:'failed to find user data. login again'})
  }
  if(user.role!=='admin'){
    res.status(401).json({message:'only Admin can perform this action'})
  }
  next();
 
 };
