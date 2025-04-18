import mongoose from "mongoose";

const ReferredSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email address`,
      },
      index: true,
    },
    phone: {
      type: String,
      trim: true,
      validate: {
        validator: function (v) {
          return (
            !v ||
            /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(v)
          );
        },
        message: (props) => `${props.value} is not a valid phone number`,
      },
    },
    code: {
      type: String,
      trim: true,
    },
    referredAt: {
      type: Date,
      default: Date.now,
      immutable: true,
    },
    status: {
      type: String,
      enum: ["pending", "contacted", "converted", "rejected"],
      default: "pending",
    },
    referralSource: {
      type: String,
      enum: ["website", "social", "friend", "other"],
      default: "other",
    },
    referralId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Referral",
    },
    referredBy: { type: String }, // or ObjectId if using relational refs
  },
  {
    timestamps: true,
  }
);
export default mongoose.models.Referred ||
  mongoose.model("Referred", ReferredSchema, "referred");
