const id3  = require("node-id3")
const songModel = require("../models/song.model")
const StorageService = require("../services/storage.service")


async function uploadSong(req,res){
const songBuffer = req.file.buffer
   const tags  =  id3.read(songBuffer)
   const {mood }= req.body

   const [songFile, posterFile] = await Promise.all([
    StorageService.uploadFile({
     buffer:songBuffer,
     filename:tags.title+".mp3",
     folder:"/VibeSync/songs"
    }),
    StorageService.uploadFile({
     buffer:tags.image.imageBuffer,
     filename:tags.title + ".jpeg",
     folder:"/VibeSync/posters"
    })
   ])

   const song  = await songModel.create({
    title:tags.title,
    url:songFile.url,
    posterUrl:posterFile.url,
    mood
   })

   res.status(201).json({
    message:"song created successfully",
    song
   })
}
async function getSong(req,res){

    const {mood} = req.query
    const song  = await songModel.find({mood})
    res.status(200).json({
        message:"song fetched successfully",
        song
    })
}


module.exports = {
    uploadSong,
    getSong
}