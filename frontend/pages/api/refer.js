import connectDB from "@/lib/mongodb";
import Referred from "@/models/Referred";
import Referral from "@/models/Referral";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "POST") {
    const { name, email, referredBy } = req.body;

    // Validation
    if (!name?.trim() || !email?.trim() || !referredBy?.trim()) {
      return res.status(400).json({
        message: "Name, email, and referral code are required",
      });
    }

    try {
      // Check if referral code exists
      const referralExists = await Referral.exists({
        referralCode: referredBy,
      });
      if (!referralExists) {
        return res.status(404).json({ message: "Invalid referral code" });
      }

      // Check if email already exists
      const existingReferral = await Referred.findOne({ email });
      if (existingReferral) {
        return res.status(409).json({
          message: "This email has already been referred",
        });
      }

      // Create new referral
      const referred = await Referred.create({
        name,
        email,
        referredBy,
        status: "pending",
      });

      // Update referral count
      await Referral.findOneAndUpdate(
        { referralCode: referredBy },
        {
          $push: { referredPeople: { referredId: referred._id } },
          $inc: { totalReferrals: 1 },
        },
        { new: true }
      );

      return res.status(201).json({
        success: true,
        data: {
          _id: referred._id,
          name: referred.name,
          email: referred.email,
          status: referred.status,
        },
      });
    } catch (error) {
      console.error("Referral error:", error);
      return res.status(500).json({
        message: "Internal server error",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  return res.setHeader("Allow", ["POST"]).status(405).json({
    message: "Method not allowed",
  });
}
