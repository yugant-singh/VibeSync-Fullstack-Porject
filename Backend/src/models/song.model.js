const mongoose = require("mongoose")

const songSchema  = new mongoose.Schema({

    url:{
        type:String,
        required:true
    },
    posterUrl:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    mood:{
        type:String,
        enums:{
            values:["happy","sad","surprised"],
            message:"Error of Enum"
        }
    }

})

const songModel = mongoose.model("songs",songSchema)

module.exports = songModel