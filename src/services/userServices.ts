import User from "../models/User"
export class userService{

static registerUser = async(user:any)=>{
  try{
   const createUser = await User.create(user)
   if(!createUser){
    return( {status:401, message:'failed to register user'})
   }
   return({status:200,message:"user created"})
  }
  catch(error:any){
    console.log(error)
  }
 }
}