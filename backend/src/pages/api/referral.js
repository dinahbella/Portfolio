import connectDB from "@/lib/mongodb";
import Referral from "@/models/Referral";
import { generateReferralCode } from "@/utills/generateReferralCode.js";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "POST") {
    const { referrerName } = req.body;

    if (!referrerName) {
      return res.status(400).json({ message: "Referrer name is required." });
    }

    const referralCode =
      req.body.referralCode || generateReferralCode(referrerName);

    try {
      const existing = await Referral.findOne({ referralCode });
      if (existing) {
        return res
          .status(400)
          .json({ message: "Referral code already exists." });
      }

      const newReferrer = new Referral({
        referrerName,
        referralCode,
      });

      await newReferrer.save();
      return res.status(201).json(newReferrer);
    } catch (error) {
      console.error("Error creating referrer:", error);
      return res.status(500).json({ message: "Server error." });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
