import mongoose from "mongoose";

const { Schema, models, model } = mongoose;

const CommentSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    title: String,
    content: { type: String, required: true },
    blog: { type: mongoose.Schema.Types.ObjectId, ref: "Blog", required: true },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
    parentName: String,
    children: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    maincomment: { type: Boolean, default: true },
    edited: { type: Boolean, default: false },
    editedAt: Date,
    deleted: { type: Boolean, default: false },
    deletedAt: Date,
  },
  { timestamps: true }
);

// Export model safely
export const Comment = models.Comment || model("Comment", CommentSchema);
