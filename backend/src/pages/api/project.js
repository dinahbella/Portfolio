import connectDB from "@/lib/mongodb";
import { Project } from "@/models/Projects";

export default async function handler(req, res) {
  await connectDB();

  const { method } = req;

  try {
    switch (method) {
      case "GET":
        if (req.query?.id) {
          // Fetch a single project by ID
          const project = await Project.findById(req.query.id);
          if (!project) {
            return res.status(404).json({ error: "Project not found" });
          }
          return res.json(project);
        } else {
          // Fetch all projects
          const projects = await Project.find().sort({ createdAt: -1 });
          return res.json(projects);
        }

      case "POST":
        const {
          title,
          slug,
          description,
          images,
          client,
          projectcategory,
          tags,
          status,
        } = req.body;

        if (!title || !description || !projectcategory) {
          return res.status(400).json({ error: "Missing required fields" });
        }

        const projectDoc = await Project.create({
          title,
          slug,
          description,
          images,
          client,
          projectcategory,
          tags,
          status,
        });

        return res.status(201).json(projectDoc);

      case "PUT":
        const {
          _id,
          title: putTitle,
          slug: putSlug,
          description: putDescription,
          images: putImages,
          client: putClient,
          projectcategory: putProjectcategory,
          tags: putTags,
          status: putStatus,
        } = req.body;

        if (!_id || !putTitle || !putDescription || !putProjectcategory) {
          return res.status(400).json({ error: "Missing required fields" });
        }

        const updatedProject = await Project.findByIdAndUpdate(
          _id,
          {
            title: putTitle,
            slug: putSlug,
            description: putDescription,
            images: putImages,
            client: putClient,
            projectcategory: putProjectcategory,
            tags: putTags,
            status: putStatus,
          },
          { new: true }
        );

        if (!updatedProject) {
          return res.status(404).json({ error: "Project not found" });
        }

        return res.json(updatedProject);

      case "DELETE":
        const { id } = req.query;

        if (!id) {
          return res.status(400).json({ error: "Project ID is required" });
        }

        const deletedProject = await Project.findByIdAndDelete(id);

        if (!deletedProject) {
          return res.status(404).json({ error: "Project not found" });
        }

        return res.status(200).json({
          success: true,
          message: "Project deleted successfully",
        });

      default:
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        return res.status(405).json({ error: `Method ${method} not allowed` });
    }
  } catch (error) {
    console.error("Error in API route:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
