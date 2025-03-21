import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { Material } from "../models/material.model.js";
import generateToken from "../utills/generateToken.js";
import cloudinary from "../utills/cloudinary.js";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      generateToken(res, newUser._id);

      res.status(200).json(newUser);
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
    await newUser.save();

    res.status(201).json({
      message: "Account created successfully",
      success: true,
      newUser,
    });
  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
        success: false,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
        success: false,
      });
    }
    generateToken(res, user._id);

    res.status(200).json(user);
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

export const logout = async (_, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({
    message: "Logout successfull",
  });
};

export const updateUserProfile = async (req, res, next) => {
  try {
    // Check if the user is authenticated and matches the ID being updated
    if (!req.user || req.user._id.toString() !== req.params.id) {
      return res.status(403).json({
        success: false,
        message: "You can only update your own account.",
      });
    }

    let profilePictureUrl = req.body.profilePicture; // Default to existing or new URL

    // Upload new profile picture to Cloudinary if provided
    if (req.file) {
      // Get the current user to check for an existing profile picture
      const user = await User.findById(req.params.id);

      if (user?.profilePicture) {
        // Extract Cloudinary public_id from URL and delete old image
        const publicId = user.profilePicture.split("/").pop().split(".")[0];
        await cloudinary.v2.uploader.destroy(publicId);
      }

      // Upload new image
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "profile_pictures",
      });

      profilePictureUrl = result.secure_url;
    }

    // If password is provided, hash it before saving
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 12);
    }

    // Create an update object dynamically to avoid overwriting with `undefined`
    const updates = {};
    const allowedFields = ["name", "email", "phone"];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    if (profilePictureUrl) {
      updates.profilePicture = profilePictureUrl;
    }

    // Update the user
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    // Exclude the password from the response
    const { password, ...rest } = updatedUser.toObject();

    res.status(200).json(rest);
  } catch (error) {
    console.error("Update Profile Error:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.user.id; // Get user ID from authenticated token
    const { id } = req.params; // ID of the user to be deleted

    if (userId !== id) {
      return res.status(403).json({ message: "Unauthorized action" });
    }

    // Find user in database
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete user profile picture from Cloudinary if it exists
    if (user.profileImagePublicId) {
      await cloudinary.uploader.destroy(user.profileImagePublicId);
    }

    // Delete user from database
    await User.findByIdAndDelete(id);

    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error("Error deleting account:", error);
    res.status(500).json({ message: "Failed to delete account" });
  }
};
export const updateUserPassword = async (req, res) => {
  const { userId, currentPassword, newPassword } = req.body;
  console.log("Pass ", userId);
  try {
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Validate the current password
    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );
    console.log("Password is ok");
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    // Respond with success message
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Server error", errorMessage: error.message });
  }
};
