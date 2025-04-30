import connectDB from "@/lib/mongodb";
import { Blog } from "@/models/Blogs";

export default async function handler(req, res) {
  await connectDB();
  const { method, query, body } = req;

  try {
    switch (method) {
      // CREATE
      case "POST": {
        const { title, slug, description, images, blogcategory, tags, status } =
          body;

        if (!title || !description || !blogcategory?.length) {
          return res
            .status(400)
            .json({
              error: "Title, description, and blog category are required.",
            });
        }

        const newBlog = await Blog.create({
          title,
          slug: slug?.trim() || title.toLowerCase().replace(/\s+/g, "-"),
          description,
          images: images || [],
          blogcategory,
          tags: tags || [],
          status: status || "draft",
        });

        return res.status(201).json(newBlog);
      }

      // READ
      case "GET": {
        if (query?.id) {
          const blog = await Blog.findById(query.id);
          if (!blog) return res.status(404).json({ error: "Blog not found" });
          return res.status(200).json(blog);
        }

        const blogs = await Blog.find().sort({ createdAt: -1 });
        return res.status(200).json(blogs);
      }

      // UPDATE
      case "PUT": {
        const {
          _id,
          title,
          slug,
          description,
          images,
          blogcategory,
          tags,
          status,
        } = body;

        if (!_id || !title || !description || !blogcategory?.length) {
          return res
            .status(400)
            .json({ error: "Missing required fields for update" });
        }

        const updatedBlog = await Blog.findByIdAndUpdate(
          _id,
          {
            title,
            slug: slug?.trim() || title.toLowerCase().replace(/\s+/g, "-"),
            description,
            images: images || [],
            blogcategory,
            tags: tags || [],
            status: status || "draft",
          },
          { new: true }
        );

        if (!updatedBlog)
          return res.status(404).json({ error: "Blog not found" });

        return res.status(200).json(updatedBlog);
      }

      // DELETE
      case "DELETE": {
        if (!query?.id)
          return res.status(400).json({ error: "Blog ID is required" });

        const deleted = await Blog.findByIdAndDelete(query.id);
        if (!deleted) return res.status(404).json({ error: "Blog not found" });

        return res
          .status(200)
          .json({ success: true, message: "Blog deleted successfully" });
      }

      // UNSUPPORTED
      default:
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        return res.status(405).json({ error: `Method ${method} not allowed` });
    }
  } catch (error) {
    console.error("Blog API error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
