import connectDB from "@/lib/mongodb";
import Referred from "@/models/Referred";

export default async function handler(req, res) {
  await connectDB();

  const { method } = req;

  if (method === "GET") {
    try {
      const allReferred = await Referred.find({}).sort({ createdAt: -1 });
      return res.status(200).json(allReferred);
    } catch (err) {
      console.error("Error fetching referrals:", err);
      return res.status(500).json({ message: "Failed to fetch referrals." });
    }
  }

  if (method === "POST") {
    const { name, email, phone, code, referralSource } = req.body;

    // Basic validation
    if (!name || !email) {
      return res
        .status(400)
        .json({ message: "Name and email are required fields." });
    }

    try {
      const newReferred = new Referred({
        name,
        email,
        phone,
        code,
        referralSource,
      });

      await newReferred.save();
      return res.status(201).json(newReferred);
    } catch (error) {
      console.error("Error creating referral:", error);
      return res.status(500).json({ message: "Server error." });
    }
  }

  // Handle unsupported methods
  return res.status(405).json({ message: "Method not allowed" });
}
