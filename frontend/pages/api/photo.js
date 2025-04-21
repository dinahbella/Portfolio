import connectDB from "@/lib/mongodb";
import { Photo } from "@/models/Photo";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

const extractPublicId = (url) => {
  try {
    const parts = url.split("/");
    const fileWithExtension = parts[parts.length - 1];
    const publicId = fileWithExtension.split(".")[0];
    const folder = parts[parts.length - 2];
    return `${folder}/${publicId}`;
  } catch {
    return null;
  }
};

export default async function handler(req, res) {
  await connectDB();

  const { method, query, body } = req;

  try {
    switch (method) {
      // ========== GET ==========
      case "GET": {
        const { id, slug } = query;

        if (id) {
          const photo = await Photo.findById(id);
          if (!photo) {
            return res.status(404).json({ message: "Photo not found" });
          }
          return res.json(photo);
        }

        if (slug) {
          const photos = await Photo.find({ slug }).sort({ createdAt: -1 });
          return res.json(photos);
        }

        const photos = await Photo.find().sort({ createdAt: -1 });
        return res.json(photos);
      }

      // ========== POST ==========
      case "POST": {
        const { title, slug, images } = body;

        if (!title || !images) {
          return res
            .status(400)
            .json({ error: "Missing required fields: title and images" });
        }

        const newPhoto = await Photo.create({ title, slug, images });
        return res.status(201).json(newPhoto);
      }

      // ========== PUT ==========
      case "PUT": {
        const { _id, title, slug, images } = body;

        if (!_id || !title || !images) {
          return res
            .status(400)
            .json({ error: "Missing required fields: _id, title, and images" });
        }

        const updatedPhoto = await Photo.findByIdAndUpdate(
          _id,
          { title, slug, images },
          { new: true }
        );

        if (!updatedPhoto) {
          return res.status(404).json({ error: "Photo not found" });
        }

        return res.json(updatedPhoto);
      }

      // ========== DELETE ==========
      case "DELETE": {
        const { id } = query;

        if (!id) {
          return res.status(400).json({ error: "Photo ID is required" });
        }

        const photo = await Photo.findById(id);
        if (!photo) {
          return res.status(404).json({ error: "Photo not found" });
        }

        // Delete Cloudinary images
        for (const imgUrl of photo.images || []) {
          const publicId = extractPublicId(imgUrl);
          if (publicId) {
            await cloudinary.uploader.destroy(publicId);
          }
        }

        await photo.deleteOne();

        return res
          .status(200)
          .json({ success: true, message: "Photo deleted successfully" });
      }

      // ========== METHOD NOT ALLOWED ==========
      default:
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        return res.status(405).json({ error: `Method ${method} not allowed` });
    }
  } catch (error) {
    console.error("Photo API Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
