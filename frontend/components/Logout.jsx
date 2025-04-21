"use client";

import { useRouter } from "next/navigation";

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
    <button
      onClick={handleLogout}
      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
    >
      Log Out
    </button>
  );
}
