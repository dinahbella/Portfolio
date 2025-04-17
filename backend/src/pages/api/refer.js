import connectDB from "@/lib/mongodb";
import Referred from "@/models/Referred";
import Referral from "@/models/Referral";

export default async function handler(req, res) {
  await connectDB();

  // === POST: Create referred user ===
  if (req.method === "POST") {
    const { name, email, referredBy } = req.body;

    if (!name || !email || !referredBy) {
      return res.status(400).json({ message: "Missing fields." });
    }

    try {
      // Create referred user
      const referred = await Referred.create({
        name,
        email,
        referredBy,
        status: "pending",
      });

      // Push to Referral.referredPeople
      const updatedReferral = await Referral.findOneAndUpdate(
        { referralCode: referredBy },
        {
          $push: {
            referredPeople: {
              referredId: referred._id,
              date: new Date(),
            },
          },
          $inc: { totalReferrals: 1 },
        },
        { new: true }
      );

      if (!updatedReferral) {
        return res.status(404).json({ message: "Referrer not found." });
      }

      return res.status(201).json({
        message: "Referral recorded successfully.",
        referred,
        referrerName: updatedReferral.referrerName,
        referrerEmail: updatedReferral.referrerEmail,
      });
    } catch (err) {
      console.error("Referral error:", err);
      return res.status(500).json({ message: "Server error" });
    }
  }

  // === GET: Fetch all referred users ===
  if (req.method === "GET") {
    try {
      const referredUsers = await Referred.find({})
        .sort({ createdAt: -1 })
        .lean();

      return res.status(200).json(referredUsers);
    } catch (err) {
      console.error("Failed to fetch referred users:", err);
      return res.status(500).json({ message: "Server error" });
    }
  }

  // === METHOD NOT ALLOWED ===
  res.status(405).json({ message: "Method not allowed" });
}
