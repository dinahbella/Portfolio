import connectDB from "@/lib/mongodb";
import Project from "@/models/Projects";

export default async function handler(req, res) {
  await connectDB();

  const { method, query, body } = req;

  const generateSlug = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

  try {
    switch (method) {
      // ===================== GET =====================
      case "GET": {
        if (query?.id) {
          const project = await Project.findById(query.id);
          if (!project) {
            return res.status(404).json({ error: "Project not found" });
          }
          return res.status(200).json(project);
        }

        // Fetch all
        const projects = await Project.find().sort({ createdAt: -1 });
        return res.status(200).json(projects);
      }

      // ===================== POST =====================
      case "POST": {
        const {
          title,
          slug,
          description,
          images = [],
          file,
          client = "",
          projectcategory = [],
          tags = [],
          status = "draft",
        } = body;

        if (!title || !description || !projectcategory) {
          return res
            .status(400)
            .json({ error: "Title, description, and category are required" });
        }

        const fileUrl = typeof file === "object" && file?.url ? file.url : file;

        const newProject = await Project.create({
          title,
          slug: slug?.trim() || generateSlug(title),
          description,
          images,
          file: fileUrl || "",
          client,
          projectcategory: Array.isArray(projectcategory)
            ? projectcategory
            : [projectcategory],
          tags: Array.isArray(tags) ? tags : [tags],
          status,
        });

        return res.status(201).json(newProject);
      }

      // ===================== PUT =====================
      case "PUT": {
        const {
          _id,
          title,
          slug,
          description,
          images = [],
          file,
          client = "",
          projectcategory = [],
          tags = [],
          status = "draft",
        } = body;

        if (!_id || !title || !description || !projectcategory) {
          return res
            .status(400)
            .json({ error: "Missing required fields for update" });
        }

        const fileUrl = typeof file === "object" && file?.url ? file.url : file;

        const updated = await Project.findByIdAndUpdate(
          _id,
          {
            title,
            slug: slug?.trim() || generateSlug(title),
            description,
            images,
            file: fileUrl || "",
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

      // ===================== DELETE =====================
      case "DELETE": {
        const { id } = query;
        if (!id) {
          return res.status(400).json({ error: "Project ID is required" });
        }

        const deleted = await Project.findByIdAndDelete(id);
        if (!deleted) {
          return res.status(404).json({ error: "Project not found" });
        }

        return res
          .status(200)
          .json({ success: true, message: "Project deleted successfully" });
      }

      // ===================== METHOD NOT ALLOWED =====================
      default:
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        return res.status(405).json({ error: `Method ${method} not allowed` });
    }
  } catch (error) {
    console.error("Project API error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
