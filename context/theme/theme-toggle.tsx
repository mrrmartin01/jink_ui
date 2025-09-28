"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const ThemeToggle = ({description}: {description?: string}) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className={`flex items-center space-x-2 justify-center p-2 rounded-full text-gray-500 dark:text-gray-400 bg-transparent border-none transition-colors duration-200 ease-in-out hover:text-black dark:hover:text-white focus:outline-none`}
    >
      {description && (
        <p className="">{theme === 'light' ? "Dark" : "Light"}</p>
      )}
      {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
    </button>
  );
};

export default ThemeToggle;