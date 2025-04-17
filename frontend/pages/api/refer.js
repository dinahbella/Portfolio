import connectDB from "@/lib/mongodb";
import Referred from "@/models/Referred";
import Referral from "@/models/Referral";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "POST") {
    const { name, email, referredBy } = req.body;

    if (!name || !email || !referredBy) {
      return res.status(400).json({ message: "Missing fields." });
    }

    try {
      const referred = await Referred.create({
        name,
        email,
        referredBy,
        status: "pending",
      });

      // Also update Referral
      await Referral.findOneAndUpdate(
        { referralCode: referredBy },
        {
          $push: { referredPeople: { referredId: referred._id } },
          $inc: { totalReferrals: 1 },
        }
      );

      return res.status(201).json(referred);
    } catch (err) {
      console.error("Referral error:", err);
      return res.status(500).json({ message: "Server error" });
    }
  }

  res.status(405).json({ message: "Method not allowed" });
}
