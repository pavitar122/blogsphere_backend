import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

try {
    mongoose.connect(process.env.MONGO_URL)
    console.log("connected")
}catch(err){
    console.log(err)
}


