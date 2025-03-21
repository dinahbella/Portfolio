const { Schema, models, model } = require("mongoose");
const ProfileSchema = new Schema(
  {
    name: { type: String },
    phone: { type: Number },
    email: { type: String },
    password: { type: String },
    profilepicture: { type: String },
  },
  {
    timestamps: true,
  }
);

export const Profile =
  models.Profile || model("Profile", ProfileSchema, "profile");
