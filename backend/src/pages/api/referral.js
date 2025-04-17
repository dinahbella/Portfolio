import connectDB from "@/lib/mongodb";
import Referral from "@/models/Referral";
import { generateReferralCode } from "../../../utills/generateReferralCode";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "POST") {
    const { referrerName, referrerEmail, referrerPhone } = req.body;

    if (!referrerName || !referrerEmail || !referrerPhone) {
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
        referrerPhone,
        referrerEmail,
      });

      await newReferrer.save();
      return res.status(201).json(newReferrer);
    } catch (error) {
      console.error("Error creating referrer:", error);
      return res.status(500).json({ message: "Server error." });
    }
  }
  // Add this to the top of your POST handler:
  if (req.method === "GET") {
    try {
      const allReferrals = await Referral.find({})
        .sort({ createdAt: -1 })
        .populate("referredPeople") // 👈 populate referred people
        .lean();

      const formatted = allReferrals.map((ref) => ({
        ...ref,
        totalReferrals: ref.referredPeople?.length || 0,
      }));

      return res.status(200).json(formatted);
    } catch (err) {
      return res.status(500).json({ message: "Failed to fetch referrals." });
    }
  }
}
