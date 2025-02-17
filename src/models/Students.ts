import mongoose, { Schema } from "mongoose"

interface IStudent{
    full_name:string
    location:string
    phone:string
    email:string
    course:string
}
const userSchema=new Schema<IStudent>({
    full_name:{type:String,required:true},
    email:{type:String,required:true},
    phone:{type:String,required:true},
    location:{type:String},
    course:{type:String,required:true}
})
export const Student= mongoose.model<IStudent>('Student',userSchema)