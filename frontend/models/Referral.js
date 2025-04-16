import mongoose from "mongoose";

const ReferralSchema = new mongoose.Schema(
  {
    referrerName: {
      type: String,
      required: true,
    },

    referralCode: {
      type: String,
      required: true,
      unique: true,
    },

    referredPeople: [
      {
        name: String,
        email: String,
        note: String,
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    totalReferrals: {
      type: Number,
      default: 0,
    },

    rewardsEarned: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Referral ||
  mongoose.model("Referral", ReferralSchema, "referrals");
