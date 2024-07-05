import User from "../database/models/User.js"
import { hashPassword, comparepassword } from "../middleware/hashing.js";
import { generateToken } from "../middleware/jwtAuthentication.js";


export const register = async (req, res) => {
    try {
        const { name, email, password, cpassword } = req.body;

        const user = await User.findOne({ email: email, }).select("-password -_id")

        if (user) {
            return res.status(400).send({ msg: "You are already registered Login.", user })
        }
        if (password != cpassword) {
            return res.status(400).send({ msg: "Password and confirm password do not match" })
        }
        const hash = await hashPassword(password);

        const newUser = await User.create({
            email:email,
            password: hash,
            name: name,
        })

        const sendUser = {
            name: newUser.name,
            email: newUser.email,
            token:generateToken(newUser._id)
        }

        return res.status(200).send({ msg: "User has been added sucessfully", sendUser })

    } catch (error) {
        res.status(500).send({ error })
    }
}



export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).send({ msg: "User does not exsists signup first" })
        }
        const compare = await comparepassword(password, user.password)
        if (!compare) {
            return res.status(400).send({ msg: "Password entered is wrong." })
        }
        const sendUser = {
            name: user.name,
            email:user.email,
            token: generateToken(user._id)
        }
        return res.status(200).send({ msg: "You are logged in.", sendUser })
    } catch (error) {
        res.status(500).send({ error })
    }
}







