const express = require("express")
const authRouter = express.Router()
const authController = require("../controllers/auth.conttroller")



authRouter.post("/register",authController.registerControoller)     //  /api/auth/register
authRouter.post("/login",authController.loginController)           //  /api/auth/login

module.exports = authRouter