import connectDB from "@/lib/mongodb";
import { Blog } from "@/models/Blogs";

export default async function handler(req, res) {
  const { slug } = req.query;
  await connectDB();
  if (req.method === "GET") {
    try {
      const blog = await Blog.findOne({ slug });
      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }
      const comments = await Comment.find({ blog: blog._id }).sort({
        createdAt: -1,
      });
      res.status(200).json({ blog, comments });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" });
    }
  } else if (req.method === "POST") {
    try {
      const { name, email, title, contentpera, maincomment, parent } = req.body;

      const blog = await Blog.findOne({ slug });

      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }
      if (parent) {
        const parentComment = await Comment.findById(parent);
        if (!parentComment) {
          return res.status(404).json({ message: "Parent comment not found" });
        }
        const newComment = new Comment({
          name,
          email,
          title,
          contentpera,
          maincomment,
          parent: parentComment._id,
          blog: blog._id,
          parentName: parentComment.name,
        });
        await newComment.save();
        parentComment.children.push(newComment._id);
        await parentComment.save();
        res.status(201).json(newComment);
      }
      const newComment = new Comment({
        name,
        email,
        title,
        contentpera,
        maincomment,
        blog: blog._id,
      });
      await newComment.save();
      res.status(201).json(newComment);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    return res
      .status(405)
      .json({ message: `Method ${req.method} not allowed` });
  }
}
