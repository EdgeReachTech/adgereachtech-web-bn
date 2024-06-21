import { sendMessage } from "../helpers/sendEmail"
import User from "../models/User"
import { verificationTempletes } from "../utils/emailTempletes"
export class userService{

static registerUser = async(user:any)=>{
  try{
   const userExist = await User.findOne({email:user.email})
   if(userExist){
    return({status:401, message:'user already exists'})
    }
   const createUser = await User.create(user)
   if(!createUser){
    return({status:401, message:'failed to register user'})
   }
   let mailOptions = {
    from: process.env.OUR_EMAIL as string,
    to: createUser.email,
    subject: 'Verify Account', 
    html: verificationTempletes(createUser)
    }

    await sendMessage(mailOptions)

   return({status:200,message:`user created, check email for account verification `})
  }
  catch(error:any){
    console.log(error)
  }
 }
}