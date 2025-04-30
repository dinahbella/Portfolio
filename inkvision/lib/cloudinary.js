import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
  secure: true,
});

const storage = multer.memoryStorage();
export const upload = multer({ storage });

export async function uploadImageToCloudinary(buffer, mimetype) {
  try {
    const base64String = buffer.toString("base64");
    const dataURI = `data:${mimetype};base64,${base64String}`;

    const result = await cloudinary.uploader.upload(dataURI, {
      resource_type: "auto",
      folder: "Inkvision",
    });

    return {
      url: result.secure_url,
      public_id: result.public_id,
    };
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }
}
