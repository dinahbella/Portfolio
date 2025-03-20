import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

export default function Settings() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-blue-600">Settings</h1>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl">
        {/* Profile Picture Section */}
        <div className="flex flex-col items-center gap-4 mb-6">
          <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
            <img
              src="https://via.placeholder.com/150" // Replace with dynamic image URL
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <label className="cursor-pointer">
            <span className="text-blue-500 hover:text-blue-700 font-semibold">
              Change Profile Picture
            </span>
            <Input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                // Handle file upload logic here
                const file = e.target.files?.[0];
                if (file) {
                  console.log("Selected file:", file);
                  // You can update the profile picture state here
                }
              }}
            />
          </label>
        </div>

        {/* Account Settings Form */}
        <h2 className="text-lg font-semibold mb-2">Account Settings</h2>
        <div className="flex flex-col gap-4">
          <label className="flex flex-col">
            <span className="text-gray-700 dark:text-gray-200">Name:</span>
            <Input
              type="text"
              className="mt-1 p-2 border rounded-lg shadow-xl dark:bg-gray-700 dark:text-white"
              placeholder="Enter your name"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-gray-700 dark:text-gray-200">Email:</span>
            <Input
              type="email"
              className="mt-1 p-2 border rounded-lg shadow-xl dark:bg-gray-700 dark:text-white"
              placeholder="Enter your email"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-gray-700 dark:text-gray-200">
              Phone Number:
            </span>
            <Input
              type="number"
              className="mt-1 p-2 border rounded-lg shadow-xl dark:bg-gray-700 dark:text-white"
              placeholder="Enter your Phone Number"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-gray-700 dark:text-gray-200">Password:</span>
            <Input
              type="password"
              className="mt-1 p-2 border rounded-lg shadow-xl dark:bg-gray-700 dark:text-white"
              placeholder="Enter new password"
            />
          </label>

          <Button className="bg-blue-500 shadow-xl text-white px-4 py-2 rounded-lg hover:bg-blue-800">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
