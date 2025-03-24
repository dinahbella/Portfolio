import connectDB from "@/lib/mongodb";
import { Blog } from "@/models/Blogs";

export default async function handle(req, res) {
  await connectDB();

  const { method } = req;

  if (req.query?.id) {
    if (req.query?.id) {
      //  fetch blog by id
      const blog = await Blog.findById(req.query.id);
      res.json(blog);
    } else if (req.query?.blogcategory) {
      //  fetch b;log by category
      const blogcate = await Blog.find({
        blogcategory: req.query.blogcategory,
      });
      res.json(blogcate);
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
