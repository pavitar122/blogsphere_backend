import express from "express";
import cors from "cors";
import "./database/config.js"
import blogRoutes from "./routes/blogRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 5000;

const app = express();
app.use(express.json())
app.use(cors());

// const _dirname = path.dirname("")
// const buildpath= path.join(_dirname, "../frontend/build")
// app.use(express.static(buildpath));



app.use( "/user", userRoutes);
app.use("/blog", blogRoutes)


app.get('/', (req, res) => {
    res.send('Your blogsphere app is running.');
  });


app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});

