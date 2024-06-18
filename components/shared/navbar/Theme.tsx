"use client";

import React, { FunctionComponent } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { themes } from "@/constants";

const Theme: FunctionComponent = () => {
  const { setTheme, resolvedTheme } = useTheme();

  const currentTheme = resolvedTheme === "dark" ? "light" : "dark";

  return (
    <div>

      <span className={"cursor-pointer"} onClick={() => setTheme(currentTheme)}>
        {resolvedTheme === "light" ? (
          <Image
            src="/assets/icons/sun.svg"
            width={24}
            height={24}
            alt="sun"
            className={"active-theme"}
          />
        ) : (
          <Image
            src="/assets/icons/moon.svg"
            width={24}
            height={24}
            alt="moon"
            className={"active-theme"}
          />
        )}
      </span>
    </div>
  );
};

export default Theme;
