
const jwt = require("jsonwebtoken")
const blackListModel = require("../models/blacklist.model")

async function authUser(req, res, next) {

    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({
            message: "Token Not provided"
        })
    }
     const isAlreadyBlackListed = await blackListModel.findOne({token})
        if(isAlreadyBlackListed){
            return res.status(200).json({
                message:"token already blacklisted"
            })
        }
    try {
        const decode = await jwt.verify(token, process.env.JWT_SECRET)
        req.user = decode
        next()

    }
    catch (err) {
        return res.status(400).json({
            mesage: "token is Expire"
        })
    }

}

module.exports = {
    authUser
}