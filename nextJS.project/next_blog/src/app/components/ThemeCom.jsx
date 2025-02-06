"use client";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

export default function ThemeCom({ children }) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="min-h-screen bg-white dark:bg-[rgb(16,23,42)]"></div>;

  return (
    <div className={`min-h-screen ${theme === "dark" ? "dark bg-[rgb(16,23,42)] text-gray-200" : "bg-white text-gray-700"}`}>
      {children}
    </div>
  );
}
