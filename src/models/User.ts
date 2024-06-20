import { Document, model, Schema } from 'mongoose'

interface interUser extends Document {
     firstName:string
     lastName:string
     location:string
     dateOfBirth:Date
     status:string
     role:string
     gender:string
     isverified:boolean
     verifiedAt:Date
     password: string;
      createdAt:Date
     
 }
 
 const userSchema = new Schema<interUser> ({
     firstName:{type:String, required:true },
     lastName:{type:String, required:true },
     location:{type:String, required:true,  default:'Unknown'},
     dateOfBirth:{type:Date, required:false},
     status:{type:String, required:true,enum:['pending','active','blocked'], default:'pending'},
     role:{type:String, required:true,enum:['developer','President','Project Manager','Quality Assurence','Vice President'], default:'developer'},
     gender:{type:String, required:true,enum:['male','female','other'] , default:'other'},
     isverified:{type:Boolean, required:true , default:false},
     verifiedAt:{type:Date, required:false},
     password: {type:String, required:true },
     createdAt:{type:Date, required:true, default:Date.now()}
    })
 
    const User = model<interUser>('User', userSchema)

    export default User
    