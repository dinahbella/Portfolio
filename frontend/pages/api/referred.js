import connectDB from "@/lib/mongodb";
import Referral from "@/models/Referral";

export default async function handler(req, res) {
  await connectDB();

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

      // Prevent duplicate by email
      const alreadyReferred = referrer.referredPeople.some(
        (person) => person.email === email
      );
      if (alreadyReferred) {
        return res
          .status(409)
          .json({ message: "This email has already been referred." });
      }

      // Push referred person
      referrer.referredPeople.push({ name, email, note });
      referrer.totalReferrals += 1;
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
