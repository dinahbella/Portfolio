import connectDB from "@/lib/mongodb";
import Project from "@/models/Projects";
import { v2 as cloudinary } from "cloudinary";

// Cloudinary config (make sure your env variables are set)
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

export default async function handler(req, res) {
  await connectDB();
  const { method, query, body } = req;

  const generateSlug = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

  const extractPublicId = (url) => {
    if (!url || typeof url !== "string") return null;
    try {
      const parts = url.split("/");
      const fileWithExt = parts.pop();
      const folder = parts.pop();
      return `${folder}/${fileWithExt.split(".")[0]}`;
    } catch {
      return null;
    }
  };

  try {
    switch (method) {
      // === GET ===
      case "GET": {
        if (query.id) {
          const project = await Project.findById(query.id);
          if (!project)
            return res.status(404).json({ error: "Project not found" });
          return res.status(200).json(project);
        }

        const projects = await Project.find().sort({ createdAt: -1 });
        return res.status(200).json(projects);
      }

      // === POST ===
      case "POST": {
        const {
          title,
          slug,
          description,
          images = [],
          client = "",
          projectcategory = [],
          tags = [],
          status = "draft",
        } = body;

        if (!title || !description || projectcategory.length === 0) {
          return res
            .status(400)
            .json({ error: "Title, description, and category are required" });
        }

        const newProject = await Project.create({
          title,
          slug: slug?.trim() || generateSlug(title),
          description,
          images,
          client,
          projectcategory: Array.isArray(projectcategory)
            ? projectcategory
            : [projectcategory],
          tags: Array.isArray(tags) ? tags : [tags],
          status,
        });

        return res.status(201).json(newProject);
      }

      // === PUT ===
      case "PUT": {
        const {
          _id,
          title,
          slug,
          description,
          images = [],
          client = "",
          projectcategory = [],
          tags = [],
          status = "draft",
        } = body;

        if (!_id || !title || !description || projectcategory.length === 0) {
          return res
            .status(400)
            .json({ error: "Missing required fields for update" });
        }

        const updated = await Project.findByIdAndUpdate(
          _id,
          {
            title,
            slug: slug?.trim() || generateSlug(title),
            description,
            images,
            client,
            projectcategory: Array.isArray(projectcategory)
              ? projectcategory
              : [projectcategory],
            tags: Array.isArray(tags) ? tags : [tags],
            status,
          },
          { new: true }
        );

        if (!updated) {
          return res.status(404).json({ error: "Project not found" });
        }

        return res.status(200).json(updated);
      }

      // === DELETE ===
      case "DELETE": {
        const { id } = query;

        if (!id) {
          return res.status(400).json({ error: "Project ID is required" });
        }

        const project = await Project.findById(id);
        if (!project)
          return res.status(404).json({ error: "Project not found" });

        // Cleanup images
        try {
          if (Array.isArray(project.images)) {
            for (const url of project.images) {
              const publicId = extractPublicId(url);
              if (publicId) await cloudinary.uploader.destroy(publicId);
            }
          }

          if (project.file) {
            const publicId = extractPublicId(project.file);
            if (publicId) await cloudinary.uploader.destroy(publicId);
          }
        } catch (err) {
          console.warn("Image cleanup failed:", err.message);
        }

        await project.deleteOne();
        return res
          .status(200)
          .json({ success: true, message: "Project deleted successfully" });
      }

      // === Method Not Allowed ===
      default:
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        return res.status(405).json({ error: `Method ${method} not allowed` });
    }
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({
      error: "Internal server error",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
}
