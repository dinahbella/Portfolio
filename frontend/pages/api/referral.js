// pages/api/referrers/index.js
import dbConnect from "@/lib/dbConnect";
import Referral from "@/models/Referral";
import { generateReferralCode } from "@/utils/generateReferralCode"; // Optional utility

export default async function handler(req, res) {
  await dbConnect();

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

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    const { referralCode, name, email, note } = req.body;

    if (!referralCode || !name || !email) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    try {
      const referrer = await Referral.findOne({ referralCode });

      if (!referrer) {
        return res.status(404).json({ message: "Invalid referral code." });
      }

      // Optionally, prevent duplicate referrals by email
      const alreadyReferred = referrer.referredPeople.some(
        (person) => person.email === email
      );
      if (alreadyReferred) {
        return res
          .status(409)
          .json({ message: "This email has already been referred." });
      }

      // Update referrer
      referrer.referredPeople.push({ name, email, note });
      referrer.totalReferrals += 1;
      // Optional: referrer.rewardsEarned += 1;
      await referrer.save();

      return res.status(200).json({
        message: "Referral logged successfully.",
        referrer,
      });
    } catch (error) {
      console.error("Referral error:", error);
      return res.status(500).json({ message: "Server error." });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
