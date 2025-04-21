import connectDB from "@/lib/mongodb";
import { Photo } from "@/models/Photo";

export default async function handler(req, res) {
  await connectDB();

  const { method, query, body } = req;

  try {
    switch (method) {
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
      case "DELETE": {
        const { id } = query;

        if (!id) {
          return res.status(400).json({ error: "Photo ID is required" });
        }

        const photo = await Photo.findById(id);
        if (!photo) {
          return res.status(404).json({ error: "Photo not found" });
        }

        // Optional: Delete images from Cloudinary if they were stored there
        for (const imgUrl of photo.images) {
          const publicId = imgUrl.split("/").pop().split(".")[0]; // extract publicId from URL
          await cloudinary.uploader.destroy(`uploads/${publicId}`);
        }

        // Optional: Delete the file from Cloudinary
        if (photo.file) {
          const publicId = photo.file.split("/").pop().split(".")[0];
          await cloudinary.uploader.destroy(`uploads/${publicId}`);
        }

        await photo.deleteOne();

        return res
          .status(200)
          .json({ success: true, message: "Photo deleted successfully" });
      }

      default: {
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        return res.status(405).json({ error: `Method ${method} not allowed` });
      }
    }
  } catch (error) {
    console.error("Photo API Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
