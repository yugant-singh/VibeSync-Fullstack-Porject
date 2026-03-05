const multer  = require("multer")
const storage  = multer.memoryStorage()

const upload = multer({
    limits:{
        fileSize:1024 *1024 * 10 // 10MB
    }
})

module.exports = upload