import connectDB from "@/lib/mongodb";
import { Photo } from "@/models/Photo";

export default async function handle(req, res) {
  try {
    await connectDB();

    const { method } = req;

    if (method !== "GET") {
      return res.status(405).json({ message: "Method not allowed" });
    }

    if (req.query?.id) {
      // fetch single photo by id
      const photo = await Photo.findById(req.query.id);
      if (!photo) {
        return res.status(404).json({ message: "Photo not found" });
      }
      return res.json(photo);
    }

    if (req.query?.slug) {
      // fetch photo by slug
      const photos = await Photo.find({ slug: req.query.slug }).sort({
        _id: -1,
      });
      return res.json(photos);
    }

    // fetch all photos
    const photos = await Photo.find().sort({ _id: -1 });
    return res.json(photos);
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
