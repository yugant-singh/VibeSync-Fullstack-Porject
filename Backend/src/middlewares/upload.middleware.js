const multer  = require("multer")
const storage  = multer.memoryStorage()

const upload = multer({
    limits:{
        fileSize:1024 *1024 * 15 // 15 MB
    }
})

module.exports = upload