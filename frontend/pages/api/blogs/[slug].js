import connectDB from "@/lib/mongodb";
import { Blog } from "@/models/Blogs";
import { Comment } from "@/models/Comment";

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

      return res.status(200).json({ blog, comments });
    } catch (error) {
      console.error("GET Error:", error);
      return res.status(500).json({ message: "Server error" });
    }
  } else if (req.method === "POST") {
    try {
      const { name, email, title, content, maincomment, parent } = req.body;

      const blog = await Blog.findOne({ slug });
      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }

      let newComment;

      if (parent) {
        const parentComment = await Comment.findById(parent);
        if (!parentComment) {
          return res.status(404).json({ message: "Parent comment not found" });
        }

        newComment = new Comment({
          name,
          email,
          title,
          content,
          maincomment: false,
          parent: parentComment._id,
          blog: blog._id,
          parentName: parentComment.name,
        });

        await newComment.save();

        parentComment.children.push(newComment._id);
        await parentComment.save();

        return res.status(201).json(newComment); // ✅ return to prevent fallback
      }

      // If no parent — it's a main comment
      newComment = new Comment({
        name,
        email,
        title,
        content,
        maincomment: true,
        blog: blog._id,
      });

      await newComment.save();
      return res.status(201).json(newComment);
    } catch (error) {
      console.error("POST Error:", error);
      return res.status(500).json({ message: "Server error" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    return res
      .status(405)
      .json({ message: `Method ${req.method} not allowed` });
  }
}
