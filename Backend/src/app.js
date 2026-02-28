const express = require("express")
const app = express()
const authRouter = require("../src/routes/auth.route")
const cookieParser = require("cookie-parser")
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRouter)   // prefix /api/auth




module.exports = app