import connectDB from "@/lib/mongodb";
import Referral from "@/models/Referral";
import Referred from "@/models/Referred";

export default async function handler(req, res) {
  await connectDB();

  if (req.method !== "PUT") {
    return res.setHeader("Allow", ["PUT"]).status(405).json({
      message: "Method not allowed",
    });
  }

  const { referralId, newStatus } = req.body;

  if (!referralId || !newStatus) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Update status of referred user
    const referred = await Referred.findByIdAndUpdate(
      referralId,
      { status: newStatus },
      { new: true }
    );

    if (!referred) {
      return res.status(404).json({ message: "Referred user not found" });
    }

    // Calculate reward points (10 for contacted, 20 for converted)
    let rewardPoints = 0;
    if (newStatus === "contacted") rewardPoints = 10;
    if (newStatus === "converted") rewardPoints = 20;

    // Update referral rewards if applicable
    if (rewardPoints > 0) {
      await Referral.findOneAndUpdate(
        { referralCode: referred.referralCode },
        { $inc: { rewardsEarned: rewardPoints } }
      );
    }

    return res.status(200).json({
      message: "Status updated successfully",
      updatedStatus: referred.status,
      rewardPoints,
    });
  } catch (error) {
    console.error("Error updating status:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
}
