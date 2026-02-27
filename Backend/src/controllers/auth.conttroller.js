const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")



async function registerControoller(req, res) {

    try {
        const { username, name, email, password } = req.body

        const isAlreadyExist = await userModel.findOne({
            $or: [
                {
                    username: username
                },
                {
                    email: email
                }
            ]
        })
        if (isAlreadyExist) {
            return res.status(400).json({
                message: "User is already  registred with this credentials"
            })
        }

        const hash = await bcrypt.hash(password, 10)

        const user = await userModel.create({
            username,
            name,
            email,
            password: hash
        })

        const token = jwt.sign({
            id: user._id,
            username: user.username
        },
            process.env.JWT_SECRET, { expiresIn: "3d" }
        )
        res.cookie("token", token)

        return res.status(201).json({
            message: "user registered successfully",
            user: {
                id: user._id,
                name: user.name,
                username: user.username,
                email: user.email

            },
            token
        })
    }
    catch (err) {
        return res.status(500).json({
            message: "Server Error",
            error: err.message
        })
    }
}

async function loginController(req, res) {
    try {
        const { username, email, password } = req.body
        const user = await userModel.findOne({
            $or: [
                { username },
                { email }
            ]
        })

        if (!user) {
            return res.status(401).json({
                message: "Invalid Credentials Provided"
            })
        }

        const isPasswordVaild = await bcrypt.compare(password, user.password)
        if (!isPasswordVaild) {
            return res.status(401).json({
                message: "Invalid Passowrd"
            })
        }
        const token = jwt.sign({
            id: user._id,
            username: user.username
        },
            process.env.JWT_SECRET,
            { expiresIn: "3d" }
        )
        res.cookie("token", token)
        return res.status(200).json({
            message: "user loggedIn successfully",
            user: {
                id: user._id,
                username: user.username,
                name: user.name,
                email: user.email
            }
        })
    }
    catch (err) {
        return res.status(500).json({
            message: "Server Error",
            error: err.message
        })
    }
}



module.exports = {
    registerControoller,
    loginController
}