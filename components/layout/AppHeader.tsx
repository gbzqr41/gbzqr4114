"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AppHeader() {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="text-2xl font-bold text-black">GBZQR</div>
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </button>
          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-black hover:bg-gray-100 rounded-lg"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

