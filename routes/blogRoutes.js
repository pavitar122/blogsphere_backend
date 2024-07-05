import express from "express";
import { addBlog, deleteBlog, editBlog, fetchAllBlogs, fetchUserBlogs, getBlog } from "../controller/blogController.js";
import { authorize } from "../middleware/jwtAuthentication.js";

const route = express.Router()


route.post("/addBlog", authorize, addBlog )

route.get("/fetchAllBlogs", fetchAllBlogs)

route.get("/getBlog/:id", getBlog)

route.get("/fetchUserBlogs", authorize, fetchUserBlogs)

route.delete("/deleteBlog/:id",authorize, deleteBlog)

route.put("/editBlog/:id", authorize, editBlog)


export default route