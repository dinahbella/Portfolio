import * as React from "react";
import { useState } from "react"; // Import useState hook
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react"; // Import eye icons

export default function Login() {
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className=" flex justify-center items-center min-h-screen px-4">
      <Card className="w-full max-w-[400px] shadow-lg  p-6 rounded-lg bg-gradient-to-br from-blue-500 via-teal-600 to-indigo-800 ">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold dark:text-white">
            Admin Login
          </CardTitle>
          <CardDescription className="text-center text-black dark:text-gray-300">
            Enter your credentials to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email" className="dark:text-gray-200">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="dark:bg-gray-800  dark:border-gray-700"
                />
              </div>
              <div className="flex flex-col space-y-1.5 relative">
                <Label htmlFor="password" className="dark:text-gray-200">
                  Password
                </Label>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="dark:bg-gray-800 text-white dark:border-gray-700 pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-7 text-white hover:text-blue-700 dark:hover:text-gray-300"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            <Button className="w-full mt-4 hover:text-white hover:bg-blue-700 transition-all duration-500 hover:scale-110">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
