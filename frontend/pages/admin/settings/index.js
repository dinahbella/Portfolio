"use client"; // Required for client-side interactivity
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";

export default function Settings() {
  const [profile, setProfile] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    profilepicture: "/ppic.jpg", // Default profile image
  });
  const [selectedImage, setSelectedImage] = useState(null); // Image preview
  const [imageFile, setImageFile] = useState(null); // File object for upload
  const [isLoading, setIsLoading] = useState(false);
  const [isNewProfile, setIsNewProfile] = useState(false);

  // Fetch profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`/api/profile?id=${profile._id}`);
        if (!response.data) {
          setIsNewProfile(true); // No profile exists
          return;
        }
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Failed to fetch profile");
      }
    };
    fetchProfile();
  }, []);

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (event) => setSelectedImage(event.target.result);
      reader.readAsDataURL(file);
    }
  };

  // Remove image
  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImageFile(null);
    setProfile((prev) => ({ ...prev, profilepicture: "/ppic.jpg" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Prepare form data
      const formData = new FormData();
      formData.append("name", profile.name);
      formData.append("email", profile.email);
      formData.append("phone", profile.phone || ""); // Optional field

      if (imageFile) {
        formData.append("profilepicture", imageFile);
      }

      // Update profile request
      const url = `/api/profile?id=${profile._id}`;
      const method = "PUT"; // Fixed incorrect syntax

      const response = await axios({
        method,
        url,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (!response.data) {
        throw new Error("Failed to update profile");
      }

      setProfile(response.data);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle profile deletion
  const handleDeleteProfile = async () => {
    if (!window.confirm("Are you sure you want to delete your profile?")) {
      return;
    }

    try {
      const url = `/api/profile?id=${profile._id}`;
      await axios.delete(url);

      // Reset the profile state
      setProfile({
        name: "",
        email: "",
        phone: "",
        password: "",
        profilepicture: "/ppic.jpg",
      });
      setIsNewProfile(true); // Reset to new profile state
      toast.success("Profile deleted successfully");
    } catch (error) {
      console.error("Error deleting profile:", error);
      toast.error("Failed to delete profile");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-blue-600">Settings</h1>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl">
        {/* Profile Picture Section */}
        <div className="flex flex-col items-center gap-4 mb-6">
          <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
            <Image
              src={selectedImage || profile.profilepicture}
              alt="Profile"
              className="w-full h-full object-cover"
              width={200}
              height={200}
            />
          </div>
          <label className="cursor-pointer font-semibold">
            <span className="text-blue-500 hover:text-blue-700 font-semibold">
              Change Profile Picture
            </span>
            <Input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
          {selectedImage && (
            <Button
              onClick={handleRemoveImage}
              className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
            >
              Remove Image
            </Button>
          )}
        </div>

        {/* Account Settings Form */}
        <h2 className="text-lg font-semibold mb-2">Account Settings</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <label className="flex flex-col font-semibold">
              <span className="text-gray-700 dark:text-gray-200">Name:</span>
              <Input
                type="text"
                className="mt-1 p-2 border rounded-lg shadow-xl dark:bg-gray-700 dark:text-white"
                placeholder="Enter your name"
                value={profile.name}
                onChange={(e) =>
                  setProfile((prev) => ({ ...prev, name: e.target.value }))
                }
                required
              />
            </label>

            <label className="flex flex-col font-semibold">
              <span className="text-gray-700 dark:text-gray-200">Email:</span>
              <Input
                type="email"
                className="mt-1 p-2 border rounded-lg shadow-xl dark:bg-gray-700 dark:text-white"
                placeholder="Enter your email"
                value={profile.email}
                onChange={(e) =>
                  setProfile((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </label>

            <label className="flex flex-col font-semibold">
              <span className="text-gray-700 dark:text-gray-200">
                Phone Number:
              </span>
              <Input
                type="number"
                className="mt-1 p-2 border rounded-lg shadow-xl dark:bg-gray-700 dark:text-white"
                placeholder="Enter your Phone Number"
                value={profile.phone}
                onChange={(e) =>
                  setProfile((prev) => ({ ...prev, phone: e.target.value }))
                }
              />
            </label>

            <label className="flex flex-col font-semibold">
              <span className="text-gray-700 dark:text-gray-200">
                Password:
              </span>
              <Input
                type="password"
                className="mt-1 p-2 border rounded-lg shadow-xl dark:bg-gray-700 dark:text-white"
                placeholder="Enter new password"
                value={profile.password}
                onChange={(e) =>
                  setProfile((prev) => ({ ...prev, password: e.target.value }))
                }
              />
            </label>

            <Button
              type="submit"
              className="bg-blue-500 shadow-xl font-semibold text-white px-4 py-2 rounded-lg hover:bg-blue-800"
              disabled={isLoading}
            >
              {isLoading
                ? "Saving..."
                : isNewProfile
                ? "Create Profile"
                : "Save Changes"}
            </Button>

            {!isNewProfile && (
              <Button
                type="button"
                onClick={handleDeleteProfile}
                className="bg-red-500 shadow-xl font-semibold text-white px-4 py-2 rounded-lg hover:bg-red-800"
                disabled={isLoading}
              >
                Delete Profile
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
