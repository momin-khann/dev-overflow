"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface ThemeContextType {
  mode: string;
  setMode: (mode: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// theme provider
const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<string>("dark");

  const handleThemeChange = () => {
    //   if (
    //     mode === "system" ||
    //     (!("theme" in localStorage) &&
    //       window.matchMedia("(prefers-color-scheme: dark)").matches)
    //   ) {
    //     setDarkMode();
    //   } else {
    //     setLightMode();
    //   }
    //
    //   if (mode === "dark") {
    //     setDarkMode();
    //   } else if (mode === "light") {
    //     setLightMode();
    //   }
    // };

    if (mode === "dark") setDarkMode();
    else setLightMode();
  };

  function setDarkMode() {
    setMode("dark");
    document.documentElement.classList.add("dark");

    localStorage.theme = "dark";
  }

  function setLightMode() {
    setMode("light");
    document.documentElement.classList.remove("dark");

    localStorage.theme = "light";
  }

  // useEffect for detecting changes
  useEffect(() => {
    handleThemeChange();
  }, [mode]);

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
