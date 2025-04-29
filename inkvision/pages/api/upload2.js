import { promises as fs } from "fs";
import path from "path";

// Disable Next.js built-in body parser for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const formidable = (await import("formidable")).default;

    // Ensure the upload directory exists
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadDir, { recursive: true });

    const form = formidable({
      multiples: true,
      uploadDir,
      keepExtensions: true,
      maxFileSize: MAX_FILE_SIZE,
      filename: (name, ext, part) => {
        const timestamp = Date.now();
        const randomStr = Math.random().toString(36).substring(2, 8);
        const extension = path.extname(part.originalFilename || "");
        const baseName = path.parse(part.originalFilename || "file").name;
        return `${baseName}-${timestamp}-${randomStr}${extension}`;
      },
      filter: ({ mimetype }) => {
        if (!ALLOWED_TYPES.includes(mimetype)) {
          const error = new Error("File type not allowed");
          error.statusCode = 400;
          throw error;
        }
        return true;
      },
    });

    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) {
          return reject(err);
        }
        resolve([fields, files]);
      });
    });

    const uploadedFiles = Array.isArray(files.file) ? files.file : [files.file];

    const links = uploadedFiles.map((file) => ({
      name: file.originalFilename || "unknown",
      url: `/uploads/${path.basename(file.filepath || file.path)}`,
      size: file.size,
      type: file.mimetype,
    }));

    return res.status(200).json({
      success: true,
      message: "Files uploaded successfully",
      links,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(error.statusCode || 500).json({
      success: false,
      error: error.message || "Unexpected error during file upload",
    });
  }
}
