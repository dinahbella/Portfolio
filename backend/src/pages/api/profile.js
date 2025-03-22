import { Profile } from "@/models/Profile"; // Import the Profile model
import connectDB from "@/lib/mongodb";
import bcrypt from "bcryptjs"; // For password hashing

export default async function handler(req, res) {
  await connectDB(); // Ensure DB is connected at the start

  switch (req.method) {
    case "GET":
      return getProfileById(req, res);
    case "PUT":
      return updateProfile(req, res);
    case "DELETE":
      return deleteProfile(req, res);
    default:
      return res.status(405).json({ message: "Method Not Allowed" });
  }
}

// ✅ Get a profile by ID
const getProfileById = async (req, res) => {
  const { id } = req.query;
  if (!id) return res.status(400).json({ message: "Profile ID is required" });

  try {
    const profile = await Profile.findById(id);
    if (!profile) return res.status(404).json({ message: "Profile not found" });

    res.status(200).json(profile);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};

// ✅ Update a profile by ID
const updateProfile = async (req, res) => {
  const { id } = req.query;
  if (!id) return res.status(400).json({ message: "Profile ID is required" });

  const { name, phone, email, password, profilepicture } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required" });
  }

  try {
    const updateData = { name, phone, email, profilepicture };

    // If password is provided, hash it
    if (password && password.trim() !== "") {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedProfile = await Profile.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      profile: updatedProfile,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Failed to update profile" });
  }
};

// ✅ Delete a profile by ID
const deleteProfile = async (req, res) => {
  const { id } = req.query;
  if (!id) return res.status(400).json({ message: "Profile ID is required" });

  try {
    const deletedProfile = await Profile.findByIdAndDelete(id);
    if (!deletedProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json({ message: "Profile deleted successfully" });
  } catch (error) {
    console.error("Error deleting profile:", error);
    res.status(500).json({ message: "Failed to delete profile" });
  }
};
