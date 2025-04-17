import connectDB from "@/lib/mongodb";
import { Blog } from "@/models/Blogs";

export default async function handler(req, res) {
  await connectDB();

  const { method, query, body } = req;

  try {
    if (method === "POST") {
      const { title, slug, description, images, blogcategory, tags, status } =
        body;

      if (!title || !description || !blogcategory) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const newBlog = await Blog.create({
        title,
        slug,
        description,
        images,
        blogcategory,
        tags,
        status,
      });

      return res.status(201).json(newBlog);
    }

    if (method === "GET") {
      const { id, blogcategory, tags, slug } = query;

      if (id) {
        const blog = await Blog.findById(id);
        if (!blog) {
          return res.status(404).json({ error: "Blog not found" });
        }
        return res.json(blog);
      }

      if (blogcategory) {
        const blogs = await Blog.find({ blogcategory }).sort({ createdAt: -1 });
        return res.json(blogs);
      }

      if (tags) {
        const blogs = await Blog.find({ tags }).sort({ createdAt: -1 });
        return res.json(blogs);
      }

      if (slug) {
        const blogs = await Blog.find({ slug }).sort({ createdAt: -1 });
        return res.json(blogs);
      }

      // Return all blogs
      const allBlogs = await Blog.find().sort({ createdAt: -1 });
      return res.json(allBlogs);
    }

    if (method === "PUT") {
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

      if (!_id || !title || !description || !blogcategory) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const updatedBlog = await Blog.findByIdAndUpdate(
        _id,
        {
          title,
          slug,
          description,
          images,
          blogcategory,
          tags,
          status,
        },
        { new: true }
      );

      if (!updatedBlog) {
        return res.status(404).json({ error: "Blog not found" });
      }

      return res.json(updatedBlog);
    }

    if (method === "DELETE") {
      const { id } = query;
      if (!id) {
        return res.status(400).json({ error: "Missing blog ID" });
      }

      const deletedBlog = await Blog.findByIdAndDelete(id);
      if (!deletedBlog) {
        return res.status(404).json({ error: "Blog not found" });
      }

      return res.json({ success: true });
    }

    // If method is not supported
    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("Error in Blog API:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
