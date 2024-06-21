import { Request, Response } from "express"
import { userService } from "../services/userServices"
import { hashingPassword } from "../utils/passwordUtils"
export class userController{

 static registerUser =async(req:Request,res:Response)=>{
    try{

       const {role,status,isverified,verifiedAt,createdAt,...userData} = req.body
       userData['password'] =await hashingPassword(userData.password)
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