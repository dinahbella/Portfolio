import { Photo } from "@/models/Photo";
import connectDB from "@/lib/mongodb";

export default async function handle(req, res) {
  await connectDB();

  const { method } = req;

  try {
    switch (method) {
      case "POST": {
        const { title, slug, images } = req.body;

        // Validate required fields
        if (!title || !images) {
          return res
            .status(400)
            .json({ error: "Missing required fields: title and images" });
        }

        // Create a new photo
        const photoDoc = await Photo.create({ title, images });
        return res.status(201).json(photoDoc);
      }

      case "GET": {
        if (req.query?.id) {
          // Fetch a single photo by ID
          const photo = await Photo.findById(req.query.id);
          if (!photo) {
            return res.status(404).json({ error: "Photo not found" });
          }
          return res.json(photo);
        } else {
          // Fetch all photos, sorted by newest first
          const photos = await Photo.find().sort({ createdAt: -1 });
          return res.json(photos);
        }
      }

      case "PUT": {
        const { _id, title, slug, images } = req.body;

        // Validate required fields
        if (!_id || !title || !images) {
          return res
            .status(400)
            .json({ error: "Missing required fields: _id, title, and images" });
        }

        // Update the photo
        const updatedPhoto = await Photo.findByIdAndUpdate(
          _id,
          { title, images },
          { new: true } // Return the updated document
        );

        if (!updatedPhoto) {
          return res.status(404).json({ error: "Photo not found" });
        }

        return res.json(updatedPhoto);
      }

      case "DELETE": {
        if (req.query?.id) {
          // Delete the photo
          const deletedPhoto = await Photo.findByIdAndDelete(req.query.id);
          if (!deletedPhoto) {
            return res.status(404).json({ error: "Photo not found" });
          }
          return res.json({ success: true });
        } else {
          return res.status(400).json({ error: "Missing photo ID" });
        }
      }

      default: {
        // Handle unsupported methods
        return res.status(405).json({ error: "Method not allowed" });
      }
    }
  } catch (error) {
    console.error("Error in API route:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
