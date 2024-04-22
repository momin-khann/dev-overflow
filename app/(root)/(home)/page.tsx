"use client";

import React from "react";
import { useTheme } from "@/context/ThemeProvider";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { mode } = useTheme();
  return (
    <main>
      {mode} mode
      <UserButton afterSignOutUrl={"/"} />
      <Button variant="outline">Button</Button>
    </main>
  );
}
