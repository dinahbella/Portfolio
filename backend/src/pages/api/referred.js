import connectDB from "@/lib/mongodb";
import Referred from "@/models/Referred";
import Referral from "@/models/Referral";

export default async function handler(req, res) {
  await connectDB();

  const { method } = req;

  // GET: Fetch all referred entries
  if (method === "GET") {
    try {
      const allReferred = await Referred.find({})
        .sort({ createdAt: -1 })
        .populate("referralId"); // Optional: populate linked referral info
      return res.status(200).json(allReferred);
    } catch (err) {
      console.error("Error fetching referrals:", err);
      return res.status(500).json({ message: "Failed to fetch referrals." });
    }
  }

  // POST: Create new referred and attach to referral if valid code
  if (method === "POST") {
    const { name, email, phone, code, referralSource } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required." });
    }

    try {
      let referralId = null;

      if (code) {
        const matchedReferral = await Referral.findOne({ referralCode: code });
        if (matchedReferral) {
          referralId = matchedReferral._id;
        }
      }

      const newReferred = new Referred({
        name,
        email,
        phone,
        code,
        referralSource,
        referralId, // link if exists
      });

      await newReferred.save();

      // If matched referral, push referred person into referredPeople
      if (referralId) {
        await Referral.findByIdAndUpdate(referralId, {
          $push: { referredPeople: newReferred._id },
        });
      }

      return res.status(201).json(newReferred);
    } catch (error) {
      console.error("Error creating referred:", error);
      return res.status(500).json({ message: "Server error." });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
