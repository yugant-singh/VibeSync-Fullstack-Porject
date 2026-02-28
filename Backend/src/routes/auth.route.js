const express = require("express")
const authRouter = express.Router()
const authController = require("../controllers/auth.controller")
const authMiddleware = require("../middlewares/auth.middleware")
authRouter.post("/register",authController.registerController)   // /api/auth/register
authRouter.post("/login", authController.loginController)       // /api/auth/login
authRouter.get("/get-me",authMiddleware.authUser,authController.getMeController)
authRouter.get("/logout",authMiddleware.authUser,authController.logOutController)

module.exports = authRouter