import connectDB from "@/lib/mongodb";
import { Blog } from "@/models/Blogs";

export default async function handle(req, res) {
  await connectDB();

  const { method } = req;

  if (method === "GET") {
    if (req.query?.id) {
      // Fetch a single blog by ID
      const blog = await Blog.findById(req.query.id);
      if (!blog) {
        return res.status(404).json({ error: "Blog not found" });
      }
      return res.json(blog);
    } else {
      // Fetch all blogs
      const blogs = await Blog.find().sort({ createdAt: -1 }); // Sort by newest first
      return res.json(blogs);
    }
  }

  if (req.query?.id) {
    if (req.query?.id) {
      //  fetch blog by id
      const blog = await Blog.findById(req.query.id);
      res.json(blog);
    } else if (req.query?.blogcategory) {
      //  fetch blog by category
      const blogcate = await Blog.find({
        blogcategory: req.query.blogcategory,
      });
      res.json(blogcate);
    } else if (req.query?.tags) {
      //  fetch blog by tags
      const blogtags = await Blog.find({ tags: req.query.tags });
      res.json(blogtags);
    } else if (req.query.slug) {
      //  fetch blog by slug
      const blogslug = await Blog.find({
        slug: req.query.slug,
      });
      res.json(blogslug.reverse());
    } else {
      //  fetch all blogs
      const blogs = await Blog.find();
      res.json(blogs.reverse());
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
