import connectDB from "@/lib/mongodb";
import Referral from "@/models/Referral";
import { generateReferralCode } from "@/utills/generateReferralCode";

export default async function handler(req, res) {
  await connectDB();

  const { method } = req;

  // GET: Fetch all referrers
  if (method === "GET") {
    try {
      const allReferrals = await Referral.find({}).sort({ createdAt: -1 });
      return res.status(200).json(allReferrals);
    } catch (err) {
      console.error("Error fetching referrals:", err);
      return res.status(500).json({ message: "Failed to fetch referrals." });
    }
  }

  // POST: Create a new referrer
  if (method === "POST") {
    const {
      referrerName,
      referrerEmail,
      referrerPhone,
      referralCode: customCode,
    } = req.body;

    if (!referrerName || !referrerEmail || !referrerPhone) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const referralCode = customCode || generateReferralCode(referrerName);

    try {
      const existing = await Referral.findOne({ referralCode });
      if (existing) {
        return res
          .status(400)
          .json({ message: "Referral code already exists." });
      }

      const newReferrer = new Referral({
        referrerName,
        referrerEmail,
        referrerPhone,
        referralCode,
      });

      await newReferrer.save();
      return res.status(201).json(newReferrer);
    } catch (error) {
      console.error("Error creating referrer:", error);
      return res.status(500).json({ message: "Server error." });
    }
  }

  // Fallback for unsupported methods
  return res.status(405).json({ message: "Method not allowed" });
}
