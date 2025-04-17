import connectDB from "@/lib/mongodb";
import Referred from "@/models/Referred";

export default async function handler(req, res) {
  await connectDB();

  const {
    query: { id },
    method,
  } = req;

  if (method === "GET") {
    try {
      const referred = await Referred.findById(id).lean();

      if (!referred) {
        return res.status(404).json({ message: "Referred user not found." });
      }

      return res.status(200).json(referred);
    } catch (err) {
      console.error("Error fetching referred user by ID:", err);
      return res.status(500).json({ message: "Server error." });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
