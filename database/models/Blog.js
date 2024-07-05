import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    imageLink: {
        type: String
    }
}, { timestamps: true });

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
