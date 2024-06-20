import { Request, Response } from "express"
import { userService } from "../services/userServices"
export class userController{

 static registerUser =async(req:Request,res:Response)=>{
    try{
       const userData = req.body
      const user =  await userService.registerUser(userData)
       if(!user || undefined){
      res.status(401).json({message:"failed to register users"})
       }
       res.status(user?.status as number).json({message:user?.message})
     
    }
    catch(error:any){
  res.status(500).json({error:`Error ${error.message} happened`})
    }
 }   
}