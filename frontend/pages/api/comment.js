import connectDB from "@/lib/mongodb";
import { Comment } from "@/models/Comment";

export default async function handle(req, res) {
  await connectDB();

  const { method } = req;
  if (method === "POST") {
    try {
      const { name, email, title, contentpera, parent } = req.body;
      let commentDoc;
      if (parent) {
        commentDoc = await Comment.create({
          name,
          email,
          title,
          contentpera,
          parent: parent,
        });
        await Comment.findByIdAndUpdate(parent, {
          $push: { children: commentDoc._id },
        });
      } else {
        commentDoc = await Comment.create({
          name,
          email,
          title,
          contentpera,
        });
      }
      res.status(201).json(commentDoc);
    } catch (error) {
      console.log("Error creating comment:", error);
      res.status(500).json({ error: "Failed to create comment" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    return res
      .status(405)
      .json({ message: `Method ${req.method} not allowed` });
  }
}
