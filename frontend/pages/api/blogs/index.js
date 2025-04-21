import connectDB from "@/lib/mongodb";
import { Blog } from "@/models/Blogs";
import cloudinary from "@/lib/cloudinary"; // Ensure this is configured

export default async function handler(req, res) {
  await connectDB();

  const { method, query, body } = req;

  try {
    switch (method) {
      // ========== CREATE ==========
      case "POST": {
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

      // ========== READ ==========
      case "GET": {
        const { id, blogcategory, tags, slug } = query;

        if (id) {
          const blog = await Blog.findById(id);
          if (!blog) return res.status(404).json({ error: "Blog not found" });
          return res.json(blog);
        }

        if (slug) {
          const blogs = await Blog.find({ slug }).sort({ createdAt: -1 });
          return res.json(blogs);
        }

        if (blogcategory) {
          const blogs = await Blog.find({ blogcategory }).sort({
            createdAt: -1,
          });
          return res.json(blogs);
        }

        if (tags) {
          const blogs = await Blog.find({ tags }).sort({ createdAt: -1 });
          return res.json(blogs);
        }

        // Return all blogs
        const allBlogs = await Blog.find().sort({ createdAt: -1 });
        return res.json(allBlogs);
      }

      // ========== UPDATE ==========
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

      // ========== DELETE ==========
      case "DELETE": {
        const { id } = query;

        if (!id) {
          return res.status(400).json({ error: "Blog ID is required" });
        }

        const blog = await Blog.findById(id);
        if (!blog) {
          return res.status(404).json({ error: "Blog not found" });
        }

        // Delete images from Cloudinary
        for (const imgUrl of blog.images || []) {
          const publicId = imgUrl.split("/").pop().split(".")[0];
          await cloudinary.uploader.destroy(`uploads/${publicId}`);
        }

        // Optional: Delete file from Cloudinary if present
        if (blog.file) {
          const fileId = blog.file.split("/").pop().split(".")[0];
          await cloudinary.uploader.destroy(`uploads/${fileId}`);
        }

        await blog.deleteOne();

        return res.status(200).json({
          success: true,
          message: "Blog deleted successfully",
        });
      }

      // ========== METHOD NOT ALLOWED ==========
      default:
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        return res.status(405).json({ error: `Method ${method} not allowed` });
    }
  } catch (error) {
    console.error("Error in Blog API:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
