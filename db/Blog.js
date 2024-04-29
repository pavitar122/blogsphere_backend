import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    name:String,
    title:String,
    subtitle:String,
    content:String,
    date: Date,
    image: String,   
})

const Blog = mongoose.model("blog_data", blogSchema);
export default Blog;