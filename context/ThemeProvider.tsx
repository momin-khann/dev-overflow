"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface ThemeContextType {
  mode: string;
  setMode: (mode: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// theme provider
const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<string>("light");

  const handleThemeChange = () => {
    if (mode === "dark") {
      setMode("light");
      document.documentElement.classList.remove("dark"); // remove the previous class
      document.documentElement.classList.add("light");
    } else if (mode === "light") {
      setMode("dark");
      document.documentElement.classList.remove("light"); // remove the previous class
      document.documentElement.classList.add("dark");
    }
  };

  // useEffect for detecting changes
  // useEffect(() => {
  //
  // }, []);

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
