import connectDB from "@/lib/mongodb";
import { AiPhoto } from "@/models/AiPhoto";

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

        // Create a new aiphoto
        const aiphotoDoc = await AiPhoto.create({ title, images });
        return res.status(201).json(aiphotoDoc);
      }

      case "GET": {
        if (req.query?.id) {
          // Fetch a single aiphoto by ID
          const aiphoto = await AiPhoto.findById(req.query.id);
          if (!aiphoto) {
            return res.status(404).json({ error: "aiphoto not found" });
          }
          return res.json(aiphoto);
        } else {
          // Fetch all aiphotos, sorted by newest first
          const aiphotos = await AiPhoto.find().sort({ createdAt: -1 });
          return res.json(aiphotos);
        }
      }

      case "PUT": {
        const { _id, title, slug, images } = req.body;

        // Validate required fields
        if (!_id || !title || !images || !slug) {
          return res
            .status(400)
            .json({ error: "Missing required fields: _id, title, and images" });
        }

        // Update the aiphoto
        const updatedaiphoto = await AiPhoto.findByIdAndUpdate(
          _id,
          { title, images },
          { new: true } // Return the updated document
        );

        if (!updatedaiphoto) {
          return res.status(404).json({ error: "aiphoto not found" });
        }

        return res.json(updatedaiphoto);
      }

      case "DELETE": {
        if (req.query?.id) {
          // Delete the aiphoto
          const deletedaiphoto = await AiPhoto.findByIdAndDelete(req.query.id);
          if (!deletedaiphoto) {
            return res.status(404).json({ error: "aiphoto not found" });
          }
          return res.json({ success: true });
        } else {
          return res.status(400).json({ error: "Missing aiphoto ID" });
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
