import connectDB from "@/lib/mongodb";
import { Project } from "@/models/Projects";

export default async function handler(req, res) {
  await connectDB();

  const { method, query, body } = req;

  try {
    switch (method) {
      case "GET": {
        const { id, projectcategory, slug } = query;

        if (id) {
          const project = await Project.findById(id);
          if (!project) {
            return res.status(404).json({ error: "Project not found" });
          }
          return res.json(project);
        }

        if (projectcategory) {
          const projects = await Project.find({ projectcategory }).sort({
            createdAt: -1,
          });
          return res.json(projects);
        }

        if (slug) {
          const projects = await Project.find({ slug }).sort({ createdAt: -1 });
          return res.json(projects);
        }

        const allProjects = await Project.find().sort({ createdAt: -1 });
        return res.json(allProjects);
      }

      case "POST": {
        const {
          title,
          slug,
          description,
          images,
          file,
          client,
          projectcategory,
          tags,
          status,
        } = body;

        if (!title || !description || !projectcategory) {
          return res.status(400).json({ error: "Missing required fields" });
        }

        const projectDoc = await Project.create({
          title,
          slug,
          description,
          images,
          file,
          client,
          projectcategory,
          tags,
          status,
        });

        return res.status(201).json(projectDoc);
      }

      case "PUT": {
        const {
          _id,
          title,
          slug,
          description,
          images,
          file,
          client,
          projectcategory,
          tags,
          status,
        } = body;

        if (!_id || !title || !description || !projectcategory) {
          return res.status(400).json({ error: "Missing required fields" });
        }

        const updatedProject = await Project.findByIdAndUpdate(
          _id,
          {
            title,
            slug,
            description,
            images,
            file,
            client,
            projectcategory,
            tags,
            status,
          },
          { new: true }
        );

        if (!updatedProject) {
          return res.status(404).json({ error: "Project not found" });
        }

        return res.json(updatedProject);
      }

      case "DELETE": {
        const { id } = query;

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
      }

      default: {
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        return res.status(405).json({ error: `Method ${method} not allowed` });
      }
    }
  } catch (error) {
    console.error("Error in Project API route:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
