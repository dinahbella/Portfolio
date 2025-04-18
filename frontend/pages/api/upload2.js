import { promises as fs } from "fs";
import path from "path";

// Disable Next.js body parser to handle file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper to parse multipart form data
const parseForm = async (req) => {
  return new Promise(async (resolve, reject) => {
    const formidable = (await import("formidable")).default;
    const form = formidable({
      multiples: true,
      uploadDir: path.join(process.cwd(), "public", "uploads"),
      keepExtensions: true,
      filename: (name, ext, part) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        return `${part.name || "file"}-${uniqueSuffix}${ext}`;
      },
    });

    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Parse the form data
    const { files } = await parseForm(req);

    // Handle single file or multiple files
    const fileList = Array.isArray(files.file) ? files.file : [files.file];
    const uploadsDir = path.join(process.cwd(), "public", "uploads");

    // Ensure upload directory exists
    try {
      await fs.access(uploadsDir);
    } catch {
      await fs.mkdir(uploadsDir, { recursive: true });
    }

    // Process each file
    const links = fileList
      .map((file) => {
        if (!file) return null;

        // Get the relative path from public directory
        const relativePath = path.relative(
          path.join(process.cwd(), "public"),
          file.filepath
        );

        return {
          name: file.originalFilename || "file",
          url: `/${relativePath.replace(/\\/g, "/")}`,
          size: file.size,
          type: file.mimetype,
        };
      })
      .filter(Boolean);

    return res.status(200).json({
      success: true,
      message: "Files uploaded successfully",
      links,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to upload files",
      details: error.message,
    });
  }
}
