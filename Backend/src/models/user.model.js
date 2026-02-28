const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"],
        default:""
    },
    username:{
        type:String,
        required:[true,"username is required"],
        unique:[true,"username must be unique"]
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:[true,"email must be unique"]
    },
    password:{
        type:String,
        required:[true,"password is required"]
        
    },
    profile_url:{
        type:String,
        default:"https://ik.imagekit.io/xyjgsas1o/default.png?updatedAt=1770787503341",
       
    }
},{timestamps:true})

const userModel = mongoose.model("users",userSchema)
module.exports = userModel