const songModel = require("../models/song.model");
const multer = require("multer")
const id3 = require("node-id3")
const storageService = require("../services/storage.service")

async function uploadSong(req, res) {
  const songBuffer = req.file.buffer
  const {mood} = req.body
  const tags = await id3.read(songBuffer)
  // const songFile = await storageService.uploadFile({
  //   buffer: songBuffer,
  //   filename : tags.title + ".mp3",
  //   folder : "/Moodify/songs"
  // })

  // const posterFile = await storageService.uploadFile({
  //   buffer : tags.image?.imageBuffer,
  //   filename : tags.title + ".jpeg",
  //   folder : "/Moodify/posters"
  // })
//   let posterUrl = "https://your-default-image-url.com/default.jpg";//change

// if (tags.image && tags.image.imageBuffer) {

//   const posterFile = await storageService.uploadFile({
//     buffer: tags.image.imageBuffer,
//     filename: tags.title + ".jpeg",
//     folder: "/Moodify/posters"
//   });

//   posterUrl = posterFile.url;
// }

const [songFile, posterFile] = await Promise.all([

  storageService.uploadFile({
    buffer: songBuffer,
    filename: tags.title + ".mp3",
    folder: "/Moodify/songs"
  }),

  tags.image.imageBuffer
    ? storageService.uploadFile({
        buffer: tags.image.imageBuffer,
        filename: tags.title + ".jpeg",
        folder: "/Moodify/posters"
      })
    : Promise.resolve({ url: "" })

]);

  const normalizedTitle = String(tags.title || "")
    .replace(/paagalNew/gi, "")
    .replace(/\s{2,}/g, " ")
    .trim();

  const song  = await songModel.create({
    title : normalizedTitle,
    url: songFile.url,
    posterUrl: posterFile.url,
    mood
  })

  res.status(201).json({
    message:"song created successfully",
    song
  })
}

// async function getSong(req, res) {
//   const {mood} = req.query;
//   const song = await songModel.findOne({mood})

//   res.status(200).json({
//     message:"song loaded",
//     song
//   })
// }
async function getSong(req, res) {
  const mood = String(req.query.mood || "").toLowerCase();
  const match = mood ? { mood } : {};

  const songs = await songModel.aggregate([
    {
      $match: match
    },
    {
      $sample: { size: 1 }
    }
  ]);

  const song = songs[0];

  if (song?.title) {
    song.title = String(song.title)
      .replace(/paagalNew/gi, "")
      .replace(/\s{2,}/g, " ")
      .trim();
  }

  res.status(200).json({
    message: "song loaded",
    song
  });
}

module.exports = {
  uploadSong , getSong
}