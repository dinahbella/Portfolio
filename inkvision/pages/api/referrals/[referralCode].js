import connectDB from "@/lib/mongodb";
import Referral from "@/models/Referral";
import Referred from "@/models/Referred";

export default async function handler(req, res) {
  await connectDB();

  const { method, query, body } = req;

  const { referralCode } = query;

  if (!referralCode) {
    return res.status(400).json({ message: "Referral code is required" });
  }

  try {
    if (method === "GET") {
      // Fetch Referral Info
      const referrer = await Referral.findOne({ referralCode })
        .populate({
          path: "referredPeople.referredId",
          select: "name email status referredAt",
        })
        .lean();

      if (!referrer) {
        return res.status(404).json({ message: "Referrer not found" });
      }

      const referrals = referrer.referredPeople.map((entry) => ({
        name: entry.referredId?.name || "N/A",
        email: entry.referredId?.email || "N/A",
        status: entry.referredId?.status || "pending",
        date: entry.referredId?.referredAt || entry.date,
      }));

      return res.status(200).json({
        referralCode,
        referrerName: referrer.referrerName,
        referrerEmail: referrer.referrerEmail,
        totalReferrals: referrals.length,
        rewardsEarned: referrer.rewardsEarned,
        referrals,
      });
    }

    if (method === "PUT") {
      const { referredEmail, newStatus } = body;

      if (!referredEmail || !newStatus) {
        return res.status(400).json({
          message: "Missing referred email or new status.",
        });
      }

      // Update referred status
      const referredUser = await Referred.findOneAndUpdate(
        { email: referredEmail, code: referralCode },
        { status: newStatus },
        { new: true }
      );

      if (!referredUser) {
        return res.status(404).json({ message: "Referred user not found" });
      }

      // Reward logic: only if marked "converted"
      if (newStatus === "converted") {
        await Referral.findOneAndUpdate(
          { referralCode },
          { $inc: { rewardsEarned: 1 } }
        );
      }

      return res.status(200).json({
        message: "Referred user status updated",
        referredUser,
      });
    }

    res.setHeader("Allow", ["GET", "PUT"]);
    return res.status(405).json({
      message: `Method ${method} not allowed`,
    });
  } catch (error) {
    console.error("Referral API error:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
}
