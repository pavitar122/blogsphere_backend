import Blog from "../database/models/Blog.js";
import User from "../database/models/User.js";


export const addBlog = async (req, res) => {
    const userId = req.user.userId
    try {
        const {title, subtitle, content,imageLink} = req.body;
        const savedBlog = await Blog.create({
            author: userId,
            title:title,
            subtitle:subtitle,
            content: content,
            imageLink: imageLink
        });

        return res.status(200).send({msg:"Blog has been added.", savedBlog})
    } catch (error) {
        res.status(500).send({ error })
    }
};


export const fetchAllBlogs =  async (req, res) => {
    try {
        const allblogs = await Blog.find()
        .populate("author", "-password -email")

        if (allblogs.length > 0){
            return res.status(200).send({allblogs})
        }
    }catch (error) {
        res.status(500).send({ error })
    }
};

export const getBlog =  async (req, res) => {
    try {
        const blog = await Blog.find({ _id: req.params.id });
        return res.status(200).send({ blog })
    } catch (error) {
        res.status(500).send({ error })
    }  
}


export const fetchUserBlogs =  async (req, res) => {
    const userId = req.user.userId
    try {
        let blogs = await Blog.find({ author: userId })
        .populate("author", "-password -email")
        if (blogs.length > 0) {
            return res.status(200).send({ blogs })
        }
    } catch (error) {
        res.status(500).send({ error })
    }
}


export const deleteBlog = async(req, res) => {
    try {
        const result = await Blog.findByIdAndDelete(req.params.id);
        if (result) {
            return res.status(200).send({ msg: "Blog was deleted." });
        }
    } catch (error) {
        res.status(500).send({msg:"Blog was not deleated."})
    }
}


export const  editBlog = async(req, res) =>{
    const id = req.params.id;
    try {
        const updateBlog = await Blog.findByIdAndUpdate(
            id,
            { $set: { title: req.body.title, subtitle: req.body.subtitle, content: req.body.content } },
            { new: true }
        );
        if (!updateBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        return res.status(200).json({updateBlog})
    } catch (error) {
        console.error('Error occurred while updating blog:', err);
    }
} 



