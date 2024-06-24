import mongoose from "mongoose";

const connection = async () => {
     try {
          await mongoose.connect(process.env.MONGODB_URL as string,
               {
                    serverSelectionTimeoutMS: 30000, // 30 seconds timeout
               }
          );
          console.log('database connected successfully')
     }
     catch (error) {
          console.log("Failed to connect", error);
     }
}

export default connection;

// > cluster > username & password > database > connect > Drivers => mongoose