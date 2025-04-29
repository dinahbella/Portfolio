"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const res = await fetch("/api/logout");

    if (res.ok) {
      router.push("/home"); // Redirect to login after successful logout
    } else {
      console.error("Logout failed");
    }
  };

  return (
    <Button
      onClick={handleLogout}
      className="bg-blue-700 hover:bg-blue-900 text-white rounded-lg px-4 py-2 transition-colors duration-200 flex gap-2"
    >
      <LogOut className="w-4 h-4" />
      Logout
    </Button>
  );
}
