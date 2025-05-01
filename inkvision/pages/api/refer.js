import connectDB from "@/lib/mongodb";
import Referred from "@/models/Referred";
import Referral from "@/models/Referral";

export default async function handler(req, res) {
  await connectDB();

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, referredBy } = req.body;

  // Basic Validation
  if (!name?.trim() || !email?.trim() || !referredBy?.trim()) {
    return res.status(400).json({
      message: "Name, email, and referral code are required",
    });
  }

  try {
    const normalizedEmail = email.trim().toLowerCase();

    // Check if referral code exists
    const referral = await Referral.findOne({ referralCode: referredBy });
    if (!referral) {
      return res.status(404).json({ message: "Invalid referral code" });
    }

    // Check if the email is already referred
    const existingReferral = await Referred.findOne({ email: normalizedEmail });
    if (existingReferral) {
      return res.status(409).json({
        message: "This email has already been referred",
      });
    }

    // Save referred user
    const referred = await Referred.create({
      name: name.trim(),
      email: normalizedEmail,
      referredBy,
      status: "pending",
    });

    // Update the referrer's record
    await Referral.findOneAndUpdate(
      { referralCode: referredBy },
      {
        $push: { referredPeople: { referredId: referred._id } },
        $inc: { totalReferrals: 1 },
      }
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
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
}
