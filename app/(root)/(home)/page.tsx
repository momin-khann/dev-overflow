"use client";

import React from "react";
import { useTheme } from "@/context/ThemeProvider";

export default function Home() {
  const { mode } = useTheme();
  return (
    <main>
      <h1>Home Page Content</h1>
    </main>
  );
}
