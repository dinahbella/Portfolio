import connectDB from "@/lib/mongodb";
import { Comment } from "@/models/Comment";

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await connectDB();

  if (!id) return res.status(400).json({ error: "Comment ID is required" });

  try {
    switch (method) {
      case "DELETE":
        const comment = await Comment.findById(id);
        if (!comment) return res.status(404).json({ error: "Not found" });

        if (comment.parent) {
          await Comment.findByIdAndUpdate(comment.parent, {
            $pull: { children: id },
          });
        }

        if (comment.children?.length > 0) {
          await Comment.findByIdAndUpdate(id, {
            content: "[deleted]",
            name: "Deleted User",
            deleted: true,
            deletedAt: new Date(),
          });
        } else {
          await Comment.findByIdAndDelete(id);
        }

        return res.status(200).json({ message: "Comment deleted" });

      case "PUT":
        const { content } = req.body;
        const updated = await Comment.findByIdAndUpdate(
          id,
          { content, edited: true, editedAt: new Date() },
          { new: true }
        );
        if (!updated) return res.status(404).json({ error: "Not found" });
        return res.status(200).json(updated);

      default:
        return res.status(405).json({ error: `Method ${method} not allowed` });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}
