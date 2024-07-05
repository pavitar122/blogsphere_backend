import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:String,
    password:String,
    email: {
        type: String,
        lowercase: true 
    }
})

const User = mongoose.model("User", userSchema);
export default User;