import connectDB from "@/lib/mongodb";
import Referral from "@/models/Referral";
import Referred from "@/models/Referred"; // ✅ This is required for population to work

export default async function handler(req, res) {
  await connectDB();

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { referralCode } = req.query;

  try {
    // === CASE 1: Fetch single referrer by code ===
    if (referralCode) {
      const referrer = await Referral.findOne({ referralCode })
        .populate("referredPeople.referredId")
        .lean();

      if (!referrer) {
        return res.status(404).json({ message: "Referrer not found" });
      }

      const referrals = (referrer.referredPeople || []).map((entry) => ({
        name: entry.referredId?.name || "N/A",
        email: entry.referredId?.email || "N/A",
        status: entry.referredId?.status || "unknown",
        date: entry.date,
      }));

      return res.status(200).json({
        referralCode,
        referrerName: referrer.referrerName,
        totalReferrals: referrals.length,
        referrals,
      });
    }

    // === CASE 2: Fetch all referrers and their referred people ===
    const allReferrals = await Referral.find({})
      .sort({ createdAt: -1 })
      .populate("referredPeople.referredId")
      .lean();

    const formatted = allReferrals.map((ref) => ({
      _id: ref._id,
      referralCode: ref.referralCode,
      referrerName: ref.referrerName,
      referrerEmail: ref.referrerEmail,
      referrerPhone: ref.referrerPhone,
      createdAt: ref.createdAt,
      totalReferrals: ref.referredPeople?.length || 0,
      referredPeople: (ref.referredPeople || []).map((entry) => ({
        referredId: {
          name: entry.referredId?.name || "N/A",
          email: entry.referredId?.email || "N/A",
          status: entry.referredId?.status || "unknown",
        },
        date: entry.date,
      })),
    }));

    return res.status(200).json(formatted);
  } catch (err) {
    console.error("Error fetching referrals:", err);
    return res.status(500).json({ message: "Server error" });
  }
}
