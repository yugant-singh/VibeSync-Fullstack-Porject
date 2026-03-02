const express = require("express")
const app = express()
const authRouter = require("../src/routes/auth.route")
const cookieParser = require("cookie-parser")
const cors = require("cors")
app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(cookieParser())
app.use("/api/auth",authRouter)   // prefix /api/auth




module.exports = app