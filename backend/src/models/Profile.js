const { Schema, models, model } = require("mongoose");
const ProfileSchema = new Schema(
  {
    name: { type: String },
    phone: { type: Number },
    email: { type: String },
    password: { type: String },
    profilepicture: {
      type: String,
      default: "https://via.placeholder.com/150", // Default profile picture
    },
  },
  {
    timestamps: true,
  }
);

export const Profile =
  models.Profile || model("Profile", ProfileSchema, "profile");
