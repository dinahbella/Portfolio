import connectDB from "@/lib/mongodb";
import Referral from "@/models/Referral";
import Referred from "@/models/Referred";

export default async function handler(req, res) {
  await connectDB();

  if (req.method !== "GET") {
    return res.setHeader("Allow", ["GET"]).status(405).json({
      message: "Method not allowed",
    });
  }

  const { referralCode } = req.query;

  if (!referralCode) {
    return res.status(400).json({ message: "Referral code is required" });
  }

  try {
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
  } catch (error) {
    console.error("Error fetching referral data:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
}
