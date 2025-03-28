import connectDB from "@/lib/mongodb";
import { Project } from "@/models/Projects";

export default async function handle(req, res) {
  await connectDB();

  const { method } = req;

  try {
    if (method === "POST") {
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

      res.status(201).json(projectDoc);
    }
    try {
      if (req.method === "GET") {
        if (req.query?.id) {
          // Fetch a single project by ID
          const project = await Project.findById(req.query.id);
          if (!project) {
            return res.status(404).json({ error: "project not found" });
          }
          res.json(project);
        } else {
          // Fetch all projects
          const projects = await Project.find().sort({ createdAt: -1 }); // Sort by newest first
          res.json(projects);
        }
      } else {
        res.status(405).json({ error: "Method not allowed" });
      }
    } catch (error) {
      console.error("Error in /api/projects:", error);
      res.status(500).json({ error: "Internal server error" });
    }

    if (method === "PUT") {
      const {
        _id,
        title,
        slug,
        description,
        images,
        client,
        projectcategory,
        tags,
        status,
      } = req.body;

      if (!_id || !title || !description || !projectcategory) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const updatedproject = await Project.findByIdAndUpdate(
        _id,
        {
          title,
          slug,
          description,
          images,
          client,
          projectcategory,
          tags,
          status,
        },
        { new: true }
      );

      if (!updatedproject) {
        return res.status(404).json({ error: "project not found" });
      }

      res.json(updatedproject);
    }

    if (method === "DELETE") {
      if (req.query?.id) {
        const deletedproject = await Project.findByIdAndDelete(req.query.id);
        if (!deletedproject) {
          return res.status(404).json({ error: "project not found" });
        }
        res.json({ success: true });
      } else {
        res.status(400).json({ error: "Missing project ID" });
      }
    }
  } catch (error) {
    console.error("Error in API route:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
