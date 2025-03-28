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
        // Get all comments for a blog post
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
        // Get a specific comment by ID
        if (id) {
          const comment = await Comment.findById(id).populate("children");
          if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
          }
          return res.status(200).json(comment);
        }
        return res.status(400).json({ error: "Missing slug or comment ID" });

      case "POST":
        // Add a new comment
        if (!slug) {
          return res.status(400).json({ error: "Blog post slug is required" });
        }

        const { name, email, title, content, parent } = req.body;

        // Basic validation
        if (!name || !email || !content) {
          return res
            .status(400)
            .json({ error: "Name, email, and content are required" });
        }

        // Find the blog post
        const blog = await Blog.findOne({ slug });
        if (!blog) {
          return res.status(404).json({ error: "Blog post not found" });
        }

        // Create the comment
        const commentData = {
          name,
          email,
          content,
          blog: blog._id,
          title: title || "",
        };

        if (parent) {
          commentData.parent = parent;
          const parentComment = await Comment.findById(parent);
          if (!parentComment) {
            return res.status(404).json({ error: "Parent comment not found" });
          }
        }

        const comment = await Comment.create(commentData);

        // Update parent comment if this is a reply
        if (parent) {
          await Comment.findByIdAndUpdate(parent, {
            $push: { children: comment._id },
          });
        }

        // Add comment to blog post
        await Blog.findByIdAndUpdate(blog._id, {
          $push: { comments: comment._id },
          $inc: { commentCount: 1 },
        });

        return res.status(201).json(comment);

      case "PUT":
        // Update a comment
        if (!id) {
          return res.status(400).json({ error: "Comment ID is required" });
        }

        const { content: updatedContent } = req.body;
        if (!updatedContent) {
          return res.status(400).json({ error: "Content is required" });
        }

        const updatedComment = await Comment.findByIdAndUpdate(
          id,
          { content: updatedContent, edited: true },
          { new: true }
        );

        if (!updatedComment) {
          return res.status(404).json({ error: "Comment not found" });
        }

        return res.status(200).json(updatedComment);

      case "DELETE":
        // Delete a comment
        if (!id) {
          return res.status(400).json({ error: "Comment ID is required" });
        }

        // Find and delete the comment
        const commentToDelete = await Comment.findById(id);
        if (!commentToDelete) {
          return res.status(404).json({ error: "Comment not found" });
        }

        // If it's a parent comment, remove reference from blog
        if (!commentToDelete.parent) {
          await Blog.findByIdAndUpdate(commentToDelete.blog, {
            $pull: { comments: id },
            $inc: { commentCount: -1 },
          });
        }

        // If it has children, mark as deleted instead of removing
        if (commentToDelete.children && commentToDelete.children.length > 0) {
          await Comment.findByIdAndUpdate(id, {
            deleted: true,
            content: "[deleted]",
            name: "Deleted User",
            email: "",
          });
        } else {
          // If no children, remove completely
          await Comment.findByIdAndDelete(id);

          // Remove from parent's children array if it was a reply
          if (commentToDelete.parent) {
            await Comment.findByIdAndUpdate(commentToDelete.parent, {
              $pull: { children: id },
            });
          }
        }

        return res
          .status(200)
          .json({ message: "Comment deleted successfully" });

      default:
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        return res.status(405).json({ error: `Method ${method} not allowed` });
    }
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({
      error: "Internal server error",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
}
