"use client";

import React from "react";
import { useTheme } from "@/context/ThemeProvider";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  const { mode } = useTheme();
  return (
    <main>
      {mode}
      <UserButton afterSignOutUrl={"/"} />
    </main>
  );
}
