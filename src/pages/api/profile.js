import { Profile } from "@/models/Profile"; // Import the Profile model
import connectDB from "@/lib/mongodb";
import bcrypt from "bcryptjs"; // For password hashing
export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      return createProfile(req, res);
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
// ✅ Create a new profile
export const createProfile = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, phone, email, password, profilepicture } = req.body;

  try {
    await connectDB();

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email, and password are required" });
    }

    // Check if the email already exists
    const existingProfile = await Profile.findOne({ email });
    if (existingProfile) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new profile
    const newProfile = await Profile.create({
      name,
      phone,
      email,
      password: hashedPassword,
      profilepicture,
    });

    res.status(201).json({
      message: "Profile created successfully",
      profile: newProfile,
    });
  } catch (error) {
    console.error("Error creating profile:", error);
    res.status(500).json({ message: "Failed to create profile" });
  }
};

// ✅ Get a profile by ID
export const getProfileById = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { id } = req.query;

  try {
    await connectDB();

    const profile = await Profile.findById(id);
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json(profile);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};

// ✅ Update a profile by ID
export const updateProfile = async (req, res) => {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { id } = req.query;
  const { name, phone, email, password, profilepicture } = req.body;

  try {
    await connectDB();

    const updateData = { name, phone, email, profilepicture };

    // If password is provided, hash it
    if (password) {
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
export const deleteProfile = async (req, res) => {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { id } = req.query;

  try {
    await connectDB();

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
