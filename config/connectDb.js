import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectToDb= async()=>{
  try{
      const connect= await mongoose.connect(process.env.MONGO_URI);
      console.log("connected to database");
      console.log(connect.connection.host);
  }catch(error){
    console.error("not able to connect to database",error);
    process.exit(1);
  }
}

export default connectToDb;