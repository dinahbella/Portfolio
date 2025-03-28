import connectDB from "@/lib/mongodb";
import { Comment } from "@/models/Comment";
import { Blog } from "@/models/Blog";

export default async function handler(req, res) {
  await connectDB();

  const { method } = req;
  const { slug, id } = req.query;

  try {
    switch (method) {
      case "GET":
        if (slug) {
          const blog = await Blog.findOne({ slug }).populate({
            path: "comments",
            populate: { path: "children" },
          });
          if (!blog) {
            return res.status(404).json({ error: "Blog post not found" });
          }
          return res.status(200).json(blog.comments);
        }
        if (id) {
          const comment = await Comment.findById(id).populate("children");
          if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
          }
          return res.status(200).json(comment);
        }
        return res.status(400).json({ error: "Missing slug or comment ID" });

      case "POST":
        if (!slug) {
          return res.status(400).json({ error: "Blog post slug is required" });
        }

        const { name, email, title, content, parent } = req.body;

        // Enhanced validation
        if (!name?.trim() || !email?.trim() || !content?.trim()) {
          return res.status(400).json({
            error: "Name, email, and content are required",
            details: {
              name: !name?.trim() ? "Name is required" : null,
              email: !email?.trim() ? "Email is required" : null,
              content: !content?.trim() ? "Content is required" : null,
            },
          });
        }

        const blog = await Blog.findOne({ slug });
        if (!blog) {
          return res.status(404).json({ error: "Blog post not found" });
        }

        const commentData = {
          name: name.trim(),
          email: email.trim(),
          content: content.trim(),
          blog: blog._id,
          title: title?.trim() || "",
          maincomment: !parent, // Add this field to distinguish parent/child comments
        };

        if (parent) {
          const parentComment = await Comment.findById(parent);
          if (!parentComment) {
            return res.status(404).json({ error: "Parent comment not found" });
          }
          commentData.parent = parent;
          commentData.parentName = parentComment.name;
        }

        const comment = await Comment.create(commentData);

        // Update parent comment if this is a reply
        if (parent) {
          await Comment.findByIdAndUpdate(
            parent,
            { $push: { children: comment._id } },
            { new: true }
          );
        }

        // Add comment to blog post if it's a main comment
        if (!parent) {
          await Blog.findByIdAndUpdate(
            blog._id,
            { $push: { comments: comment._id }, $inc: { commentCount: 1 } },
            { new: true }
          );
        }

        return res.status(201).json(comment);

      case "PUT":
        if (!id) {
          return res.status(400).json({ error: "Comment ID is required" });
        }

        const { content: updatedContent } = req.body;
        if (!updatedContent?.trim()) {
          return res.status(400).json({ error: "Content is required" });
        }

        const updatedComment = await Comment.findByIdAndUpdate(
          id,
          {
            content: updatedContent.trim(),
            edited: true,
            editedAt: new Date(),
          },
          { new: true }
        );

        if (!updatedComment) {
          return res.status(404).json({ error: "Comment not found" });
        }

        return res.status(200).json(updatedComment);

      case "DELETE":
        if (!id) {
          return res.status(400).json({ error: "Comment ID is required" });
        }

        const commentToDelete = await Comment.findById(id);
        if (!commentToDelete) {
          return res.status(404).json({ error: "Comment not found" });
        }

        // Handle parent comment deletion
        if (!commentToDelete.parent) {
          await Blog.findByIdAndUpdate(
            commentToDelete.blog,
            { $pull: { comments: id }, $inc: { commentCount: -1 } },
            { new: true }
          );
        }

        // Handle child comment deletion
        if (commentToDelete.parent) {
          await Comment.findByIdAndUpdate(
            commentToDelete.parent,
            { $pull: { children: id } },
            { new: true }
          );
        }

        // Soft delete for comments with children
        if (commentToDelete.children?.length > 0) {
          await Comment.findByIdAndUpdate(
            id,
            {
              content: "[deleted]",
              name: "Deleted User",
              email: "",
              deleted: true,
              deletedAt: new Date(),
            },
            { new: true }
          );
        } else {
          // Hard delete for comments without children
          await Comment.findByIdAndDelete(id);
        }

        return res.status(200).json({
          message: "Comment deleted successfully",
          deleted: true,
        });

      default:
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        return res.status(405).json({ error: `Method ${method} not allowed` });
    }
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({
      error: "Internal server error",
      details:
        process.env.NODE_ENV === "development"
          ? {
              message: error.message,
              stack: error.stack,
            }
          : undefined,
    });
  }
}
