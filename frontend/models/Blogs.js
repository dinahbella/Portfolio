const { Schema, models, model } = require("mongoose");
const BlogSchema = new Schema(
  {
    title: { type: String },
    description: { type: String },
    images: [{ type: String }], // Array of strings
    blogcategory: [{ type: String }],
    tags: [{ type: String }],
    status: { type: String },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  {
    timestamps: true,
  }
);

export const Blog = models.Blog || model("Blog", BlogSchema, "blogs");
