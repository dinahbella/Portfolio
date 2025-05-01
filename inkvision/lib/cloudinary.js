// cloudinary.js
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

async function uploadImageToCloudinary(buffer, mimetype) {
  if (!buffer || !mimetype) throw new Error("Missing file data");
  const base64 = buffer.toString("base64");
  const dataURI = `data:${mimetype};base64,${base64}`;
  const result = await cloudinary.uploader.upload(dataURI, {
    folder: "Inkvision",
    resource_type: "auto",
  });
  return result;
}

export { upload, uploadImageToCloudinary };
