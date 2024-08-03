import multer, { memoryStorage } from "multer";
import Video from "../models/video.mjs";
import { v4 as uuid } from "uuid";
import dotenv from "dotenv";
dotenv.config();

const storageMemory = memoryStorage();

const upload = multer({ storageMemory }); // using storageMemory allows for the buffer key to show up. Otherwise, it's the ObjectId

// Middleware to add metadata to the file object
async function addMetadata(req, res, next) {
  if (req.file && req.query.username && req.query.category) {
    const key = `${req.query.username}/${req.query.category}/${uuid()}`;
    req.videoKey = key;
    const videoFile = new Video({
      category: req.query.category,
      videoUrl: key,
      username: req.query.username,
    });
    await videoFile.save();
  } else if (req.file && req.query.imgId) {
    const key = `${req.query.imgId}/profileImg/${uuid()}`;
    req.imgKey = key;
  }
  next();
}

export { upload, addMetadata };
