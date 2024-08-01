import mongoose from "mongoose";
const videoSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: [
      "face-on",
      "down-the-line",
      "full-swing",
      "short-game",
      "putting",
      "driving",
      "irons",
      "chipping",
      "pitching",
      "bunker-play",
      "mental-game",
      "fitness",
      "other",
    ],
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  videoUrl: {
    type: String,
    required: true,
  },
});

const Video = mongoose.model("Video", videoSchema);

export default Video;
