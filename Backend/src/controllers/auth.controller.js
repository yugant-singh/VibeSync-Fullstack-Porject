const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const blackListModel = require("../models/blacklist.model")

async function registerController(req, res) {
    try {
        const { username, email, password, name, profile_url } = req.body
        const isAlreadyExist = await userModel.findOne({
            $or: [
                {
                    username: username
                }, {
                    email: email
                }
            ]
        })
        if (isAlreadyExist) {
            return res.status(400).json({
                message: "User Already registered with this credentials"
            })
        }

        const hash = await bcrypt.hash(password, 10)

        const user = await userModel.create({
            name,
            username,
            email,
            password: hash

        })

        const token = jwt.sign({
            id: user._id,
            username: user.username
        }
            , process.env.JWT_SECRET, { expiresIn: "3d" }
        )

        res.cookie("token", token)

        res.status(201).json({
            message: "user register successfully",
            user: {
                id: user._id,
                name: user.name,
                username: user.username,
                email: user.email,
                profile_url: user.profile_url
            },
            token
        })


    }
    catch (err) {
        return res.status(500).json({
            message: "Server Error"
        })
    }
}

async function loginController(req, res) {
    try {
        const { username, email, password } = req.body
        const user = await userModel.findOne({
            $or: [
                { username: username },
                { email: email }
            ]
        })
        if (!user) {
            return res.status(403).json({
                message: "user not found"
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid credentials"
            })
        }

        const token = jwt.sign({
            id: user._id,
            username: user.username
        },
            process.env.JWT_SECRET, { expiresIn: "3d" }
        )
        res.cookie("token", token)
        return res.status(200).json({
            message: "user logged In Successfully",
            user: {
                username: user.username,
                id: user._id
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

async function getMeController(req, res) {

    const userId = req.user.id
    const user = await userModel.findById(userId)

    return res.status(200).json({
        message: "user detail fetched successfully",
        user: {
            id: user._id,
            username: user.username,
            name: user.name,
            email: user.email,
            profile_url: user.profile_url
        }
    })

}

async function logOutController(req,res){

    const token  = req.cookies.token

    res.clearCookie("token")

    const isAlreadyBlackListed = await blackListModel.findOne({token})
    if(isAlreadyBlackListed){
        return res.status(200).json({
            message:"token already blacklisted"
        })
    }

    const blacklistToken = await blackListModel.create({
        token
    })

    return res.status(200).json({
        message:"token blackListed successfully"
    })
}
module.exports = {
    registerController,
    loginController,
    getMeController,
    logOutController
}