import { Document, model, Schema } from 'mongoose'

interface interUser extends Document {
     firstName:string
     lastName:string
      location:string
      dateOfBirth:Date
     status:string
     role:string
     gander:string
     isverified:boolean
     verifiedAt:Date
     password: string;
      createdAt:Date
     
 }
 
 const userSchema = new Schema<interUser> ({
     firstName:{type:String, required:true },
     lastName:{type:String, required:true },
     location:{type:String, required:true },
     dateOfBirth:{type:Date, required:true },
     status:{type:String, required:true },
     role:{type:String, required:true },
     gander:{type:String, required:true },
     isverified:{type:Boolean, required:true },
     verifiedAt:{type:Date, required:true},
     password: {type:String, required:true },
    createdAt:{type:Date, required:true}
    })
 
    const User = model<interUser>('User', userSchema)

    export default User
    