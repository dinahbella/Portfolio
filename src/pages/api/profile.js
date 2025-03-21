import { Profile } from "@/models/Profile"; // Import the Profile model
import connectDB from "@/lib/mongodb";
import bcrypt from "bcryptjs"; // For password hashing

// Create a new profile
export const createProfile = async (req, res) => {
  const { name, phone, email, password, profilepicture } = req.body;

  try {
    await connectDB();

    // Check if the email already exists
    const existingProfile = await Profile.findOne({ email });
    if (existingProfile) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // Create a new profile
    const newProfile = new Profile({
      name,
      phone,
      email,
      password: hashedPassword,
      profilepicture,
    });

    await newProfile.save();

    res
      .status(201)
      .json({ message: "Profile created successfully", profile: newProfile });
  } catch (error) {
    console.error("Error creating profile:", error);
    res.status(500).json({ message: "Failed to create profile" });
  }
};

// Get a profile by ID
export const getProfileById = async (req, res) => {
  const { id } = req.query;

  try {
    await connectToDB();

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

// Update a profile by ID
export const updateProfile = async (req, res) => {
  const { id } = req.query;
  const { name, phone, email, password, profilepicture } = req.body;

  try {
    await connectToDB();

    // Find the profile by ID
    const profile = await Profile.findById(id);
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // Update profile fields
    profile.name = name || profile.name;
    profile.phone = phone || profile.phone;
    profile.email = email || profile.email;
    profile.profilepicture = profilepicture || profile.profilepicture;

    // Hash the new password if provided
    if (password) {
      profile.password = await bcrypt.hash(password, 10);
    }

    await profile.save();

    res.status(200).json({ message: "Profile updated successfully", profile });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Failed to update profile" });
  }
};

// Delete a profile by ID
export const deleteProfile = async (req, res) => {
  const { id } = req.query;

  try {
    await connectToDB();

    const profile = await Profile.findByIdAndDelete(id);
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json({ message: "Profile deleted successfully" });
  } catch (error) {
    console.error("Error deleting profile:", error);
    res.status(500).json({ message: "Failed to delete profile" });
  }
};
