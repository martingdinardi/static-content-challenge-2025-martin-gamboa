"use client";
import { IconSun, IconMoon } from "@tabler/icons-react";
import { useTheme } from "@/context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center p-2 rounded-full transition-all duration-300 hover:bg-zinc-800 hover:scale-105 cursor-pointer"
      aria-label={
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      }
    >
      {theme === "dark" ? (
        <IconSun size={20} className="text-[#2aff7b]" />
      ) : (
        <IconMoon size={20} className="text-gray-500" />
      )}
      <span className="ml-2 text-sm">
        {theme === "dark" ? "Light Mode" : "Dark Mode"}
      </span>
    </button>
  );
};

export default ThemeToggle;
