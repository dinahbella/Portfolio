import { upload, uploadImageToCloudinary } from "@/lib/cloudinary";

// Disable Next.js's default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // First parse the file using multer
    await new Promise((resolve, reject) => {
      upload.single("file")(req, res, (err) => {
        if (err) {
          console.error("Multer error:", err);
          return reject(err);
        }
        resolve();
      });
    });

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Then upload to Cloudinary
    const result = await uploadImageToCloudinary(
      req.file.buffer,
      req.file.mimetype
    );

    return res.status(200).json({
      success: true,
      url: result.url,
      public_id: result.public_id,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({
      error: error.message || "File upload failed",
    });
  }
}
