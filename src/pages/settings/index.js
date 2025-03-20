"use client"; // Required for client-side interactivity
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React, { useState } from "react";

export default function Settings() {
  const [profileImage, setProfileImage] = useState("/ppic.jpg"); // Default image
  const [selectedImage, setSelectedImage] = useState(null); // Selected file for preview

  // Handle file selection
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target.result); // Set the preview image
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle image removal
  const handleRemoveImage = () => {
    setSelectedImage(null);
    setProfileImage("/ppic.jpg"); // Reset to default image
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-blue-600">Settings</h1>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl">
        {/* Profile Picture Section */}
        <div className="flex flex-col items-center gap-4 mb-6">
          <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
            <Image
              src={selectedImage || profileImage} // Use selected image or default
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
        <div className="flex flex-col gap-4">
          <label className="flex flex-col font-semibold">
            <span className="text-gray-700 dark:text-gray-200">Name:</span>
            <Input
              type="text"
              className="mt-1 p-2 border rounded-lg shadow-xl dark:bg-gray-700 dark:text-white"
              placeholder="Enter your name"
            />
          </label>

          <label className="flex flex-col font-semibold">
            <span className="text-gray-700 dark:text-gray-200">Email:</span>
            <Input
              type="email"
              className="mt-1 p-2 border rounded-lg shadow-xl dark:bg-gray-700 dark:text-white"
              placeholder="Enter your email"
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
            />
          </label>

          <label className="flex flex-col font-semibold">
            <span className="text-gray-700 dark:text-gray-200">Password:</span>
            <Input
              type="password"
              className="mt-1 p-2 border rounded-lg shadow-xl dark:bg-gray-700 dark:text-white"
              placeholder="Enter new password"
            />
          </label>

          <Button className="bg-blue-500 shadow-xl font-semibold text-white px-4 py-2 rounded-lg hover:bg-blue-800">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
