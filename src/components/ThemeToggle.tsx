"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

type Theme = "dark" | "light";

const STORAGE_KEY = "sentinel-theme";

function applyTheme(theme: Theme) {
  const root = document.documentElement;

  if (theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
}

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "dark";

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;

  return "dark";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  // Apply theme to DOM and persist to localStorage
  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggle = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const isDark = theme === "dark";

  return (
    <button
      onClick={toggle}
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="
        relative flex items-center w-14 h-8 rounded-full
        border transition-colors duration-300
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
        focus-visible:ring-accent focus-visible:ring-offset-background
        bg-bg3 border-border-dim2 hover:border-muted-text/50
      "
    >
      {/* Thumb */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          layout
          initial={{ x: isDark ? 0 : 24, scale: 0.6, opacity: 0 }}
          animate={{ x: isDark ? 0 : 24, scale: 1, opacity: 1 }}
          exit={{ scale: 0.6, opacity: 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 35 }}
          className="
            absolute left-0.5 top-0.5
            flex items-center justify-center
            w-6 h-6 rounded-full
            bg-text text-bg
            shadow-sm
          "
        >
          {isDark ? (
            <Moon className="w-3.5 h-3.5" strokeWidth={2.5} />
          ) : (
            <Sun className="w-3.5 h-3.5" strokeWidth={2.5} />
          )}
        </motion.span>
      </AnimatePresence>

      {/* Background icons (ghost) */}
      <span className="absolute left-1.5 top-1/2 -translate-y-1/2 opacity-30 dark:opacity-0 transition-opacity duration-300">
        <Moon className="w-3.5 h-3.5 text-muted-text" />
      </span>
      <span className="absolute right-1.5 top-1/2 -translate-y-1/2 opacity-0 dark:opacity-30 transition-opacity duration-300">
        <Sun className="w-3.5 h-3.5 text-muted-text" />
      </span>
    </button>
  );
}
