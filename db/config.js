import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

try {
    mongoose.connect("mongodb+srv://pavitar3335:YYoGZrKHt4ZWwrDJ@cluster0.xrgjw4k.mongodb.net/?retryWrites=true&w=majority")
    console.log("connected")
}catch(err){
    console.log(err)
}


