const { Schema, models, model } = require("mongoose");
const ProjectSchema = new Schema(
  {
    title: { type: String },
    images: [{ type: String }], // Array of strings
    description: { type: String },
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
