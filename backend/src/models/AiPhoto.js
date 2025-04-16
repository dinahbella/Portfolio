const { Schema, models, model } = require("mongoose");
const AiPhotoSchema = new Schema(
  {
    title: { type: String },
    slug: { type: String },
    images: [{ type: String }], // Array of strings
  },
  {
    timestamps: true,
  }
);

export const AiPhoto =
  models.Photo || model("AiPhoto", AiPhotoSchema, "aiphotos");
