import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import multer from 'multer';
import "./db/config.js"
import Blog from "./db/Blog.js";
import User from "./db/User.js";
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';
import "./db/cloudinary.js"
import path from "path"

import dotenv from "dotenv";
dotenv.config();


const app = express();
app.use(express.json())
app.use(cors());

const _dirname = path.dirname("")
const buildpath= path.join(_dirname, "./build")
app.use(express.static(buildpath));

const saltRounds = 10;
const port = 5000;

const storage = multer.memoryStorage();
const upload = multer({ storage });

function hashPassword(password) {
    return bcrypt.hashSync(password, saltRounds);
}

function comparePasswords(plainTextPassword, hashedPassword) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(plainTextPassword, hashedPassword, (err, result) => {
            if (err) {
                reject(err); 
                return;
            }

            resolve(result); 
        });
    });
}

app.get('/', (req, res) => {
    res.send('Your app blogsphere app is running.');
  });

app.post('/upload', upload.single('image'), async (req, res) => {
    try {
        const stream = cloudinary.uploader.upload_stream({ folder: 'header' }, (error, result) => {
            console.log('Image uploaded to Cloudinary:', result);
            res.status(200).send(result);
        });
        streamifier.createReadStream(req.file.buffer).pipe(stream);
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).send('Error uploading image');
    }
});

app.post('/add_blog', async (req, res) => {
    try {
        const blog = new Blog(req.body)
        let result = await blog.save();
        res.send(result);
    } catch (error) {
        console.log(error)
    }
   
});

app.post('/register', async (req, res) => {
    let receivedData = req.body;

    const emailCheck = await User.findOne({ email: req.body.email, })

    if (receivedData.password != receivedData.cpassword) {
        res.send({ "message": "Password do not match" });

    } else if (emailCheck) {
        res.send({ "message": "Email alreay exsists" });

    } else {
        try {
            receivedData.password = hashPassword(receivedData.password);
            let user = new User({
                name: receivedData.name,
                email: receivedData.email,
                password: receivedData.password
            });
            let result = await user.save();
            let resultToSend = {
                _id: result._id,
                name: result.name,
                email: result.email,
            };
            res.send(resultToSend);
        } catch (error) {
            console.log(error)
            res.send(error);
        }

    }
});

app.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
        comparePasswords(req.body.password, user.password)
            .then((result) => {
                if (result) {
                    let resultToSend = {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                    };
                    res.send(resultToSend);
                } else {
                    res.send({ "message": "Password entered is wrong." });
                }
            })
            .catch((error) => {
                console.error("An error occurred:", error);
            });

    } else {
        res.send({ "message": "Email Does not exsists." });
    }

});


app.get("/get_blogs", async (req, res) => {
    let products = await Blog.find();
    if (products.length > 0) {
        res.send(products)
    }
})

app.get("/get_user_blogs/:name", async (req, res) => {
    let blogs = await Blog.find({ name: req.params.name });
    if (blogs.length > 0) {
        res.send(blogs)
    }
})


app.get("/blog/:id", async (req, res) => {
    let blog = await Blog.find({ _id: req.params.id });
    res.send(blog)
})


app.post('/edit-blog/:id', async (req, res) => {
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
        res.json(updateBlog);
    } catch (error) {
        console.error('Error occurred while updating blog:', err);
    }

})

app.delete("/delete/:id", async(req, res) => {
    try {
        const result = await Blog.findByIdAndDelete(req.params.id);
        if (result) {
            return res.status(200).send({ msg: "Blog was deleted." });
        } else {
            return res.status(404).send({ msg: "Blog not found." });
        }
    } catch (error) {
        res.status(400).send({msg:"Blog was not deleated."})
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

