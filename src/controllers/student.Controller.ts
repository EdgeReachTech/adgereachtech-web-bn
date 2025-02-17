import { Request,Response } from "express"
import { Student } from "../models/Students"
class StudentController{
    static apply=async(req:Request,res:Response)=>{
        const {full_name,email,course,phone,location}=req.body
try {
   await Student.create({full_name,email,course,phone,location}) 
   res.status(201).json({message:"application sent"})
} catch (error:any) {
   res.status(500).json({message:`${error.message} happened`})
    
}
    }
     static all=async(req:Request,res:Response)=>{
        try {
           const students = await Student.find() 
           res.status(200).json(students)
        } catch (error:any) {
   res.status(500).json({message:`${error.message} happened`})
            
        }
     }
}
export default StudentController