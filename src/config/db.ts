import mongoose from "mongoose"
import User from "../models/User"


const connection = async () =>{
     try{
          await mongoose.connect(process.env.MONGODB_URI as string,{})

     }
     catch (error){
     console.log(error)
     }
}

export default connection