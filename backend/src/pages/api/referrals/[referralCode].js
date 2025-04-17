import connectDB from "@/lib/mongodb";
import Referral from "@/models/Referral";
import Referred from "@/models/Referred"; // Ensure this is imported

export default async function handler(req, res) {
  await connectDB();

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { referralCode } = req.query;

  try {
    const referrer = await Referral.findOne({ referralCode })
      .populate("referredPeople.referredId")
      .lean();

    if (!referrer) {
      return res.status(404).json({ message: "Referrer not found" });
    }

    const referrals = (referrer.referredPeople || []).map((entry) => ({
      name: entry.referredId?.name || "N/A",
      email: entry.referredId?.email || "N/A",
      status: entry.referredId?.status || "pending",
      date: entry.date,
    }));

    return res.status(200).json({
      referralCode,
      referrerName: referrer.referrerName,
      totalReferrals: referrals.length,
      referrals,
    });
  } catch (error) {
    console.error("Error fetching referral data:", error);
    return res.status(500).json({ message: "Server error" });
  }
}
