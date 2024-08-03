import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

// if i want to resize before uploading to s3
// import sharp from "sharp";
import dotenv from "dotenv";
dotenv.config();

// const s3 = new S3Client();
const BUCKET = process.env.BUCKET;
const REGION = process.env.REGION;
const ACCESS_KEY = process.env.ACCESS_KEY;
const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY;

const s3 = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
});

export const uploadToS3 = async ({ file, userId, key }) => {
  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
  });

  try {
    await s3.send(command);
    return { key };
  } catch (err) {
    console.log(err);
    return { err };
  }
};

export const deleteFroms3 = async (videoName) => {
  const command = new DeleteObjectCommand({
    Bucket: BUCKET,
    Key: videoName,
  });

  try {
    await s3.send(command);
    return { key };
  } catch (err) {
    console.log(err);
    return { err };
  }
};
