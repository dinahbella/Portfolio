const { Schema, models, model } = require("mongoose");

const ProjectSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    images: [{ type: String }],
    file: { type: String },
    client: { type: String },
    projectcategory: [{ type: String }],
    tags: [{ type: String }],
    status: {
      type: String,
      enum: ["draft", "publish"],
      default: "draft",
    },
  },
  {
    timestamps: true,
  }
);

const Project = models.Project || model("Project", ProjectSchema, "projects");
export default Project;
