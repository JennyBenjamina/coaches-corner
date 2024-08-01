import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import Video from "../models/video.mjs";
import { upload, addMetadata } from "../server/database.mjs";
import { uploadToS3, deleteFroms3 } from "../server/s3.mjs";
import cron from "node-cron";

const router = express.Router();
// Convert the file URL to a path
const __filename = fileURLToPath(import.meta.url);

// Get the directory name
const __dirname = path.dirname(__filename);

// router.get("^/$|/index(.html)?", (req, res) => {
//   res.sendFile(
//     path.join(__dirname, "../../", "frontend", "public", "index.html")
//   );
// });

router.get("/", (req, res) => {
  res.send(`Hello, ${req.subdomain}`);
});

router.post(
  "/addFile",
  upload.single("file"),
  addMetadata,
  async (req, res) => {
    const { error, imgName } = uploadToS3({
      file: req.file,
      userId: req.query.username,
      key: req.videoKey,
    });

    res.send("success");
  }
);

router.get("/videos", async (req, res) => {
  const username = req.query.username;

  try {
    let files = await Video.find({
      username: username,
    });
    const fileNames = files.map((file) => file.videoUrl);
    console.log("fileNames", fileNames);
    if (fileNames.length > 0) {
      res.send(fileNames);
    } else {
      res.send("No files found");
    }
  } catch (err) {
    res.send(err);
  }
});

router.get("/imageNames", async (req, res) => {
  const category = req.query.category;
  const month = req.query.month;
  const year = req.query.year;

  try {
    let files = [];
    if (req.query.category === "all") {
      files = await Video.find({
        category: { $ne: "archive" },
        month: month,
        year: year,
      });
    } else {
      files = await Video.find({
        category: category,
        month: month,
        year: year,
      });
    }

    const fileNames = files.map((file) => file.imageUrl);
    if (fileNames.length > 0) {
      res.send(fileNames);
    } else {
      res.send("No files found");
    }
  } catch (err) {
    res.send(err);
  }
});

router.delete("/deleteFile", async (req, res) => {
  try {
    let updatedFile = await Video.findOneAndUpdate(
      { imageUrl: req.body.filename }, // Assuming req.body.imageUrl contains the imageUrl
      { $set: { category: "archive" } }, // Update the category to "archive"
      { new: true } // Return the updated document
    );

    // deleteFroms3(updatedFile.imgName);

    if (!updatedFile) {
      return res.status(404).send({ message: "File not found." });
    }

    res.send({ message: "File deleted successfully." });
  } catch (err) {
    res
      .status(500)
      .send({ message: "An error occurred while deleting the file." });
  }
});

// Function to delete files based on endDate
async function deleteExpiredFiles() {
  const currentDate = new Date();

  try {
    let updatedFile = await Video.updateMany(
      { endDate: { $lt: currentDate } },
      { $set: { category: "archive" } } // Update the category to "archive"
    );

    // deleteFroms3(updatedFile.imgName);
    console.log(updatedFile);
  } catch (err) {
    console.log("error on server");
  }

  console.log("Expired files deleted, remaining files:");
}

// Schedule the cron job to run every minute
cron.schedule("30 1 * * *", deleteExpiredFiles);

export default router;
