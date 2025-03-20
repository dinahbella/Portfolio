const { Schema, models, model } = require("mongoose");
const ProjectSchema = new Schema(
  {
    title: { type: String },
    description: { type: String },
    images: [{ type: String }],
    client: { type: String },
    projectcategory: [{ type: String }],
    tags: [{ type: String }],
    status: { type: String },
  },
  {
    timestamps: true,
  }
);

export const Project =
  models.Project || model("Project", ProjectSchema, "projects");
