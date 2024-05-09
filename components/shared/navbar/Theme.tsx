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
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:bg-light-900 data-[state=open]:bg-light-900 dark:focus:bg-dark-200 dark:data-[state=open]:bg-dark-200 outline-none">
          {resolvedTheme === "light" ? (
            <Image
              src="/assets/icons/sun.svg"
              width={20}
              height={20}
              alt="sun"
              className={"active-theme"}
            />
          ) : (
            <Image
              src="/assets/icons/moon.svg"
              width={20}
              height={20}
              alt="moon"
              className={"active-theme"}
            />
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="absolute right-[-1rem] mt-3 min-w-[120px] rounded border py-2 dark:border-dark-400 dark:bg-dark-300">
          {themes.map((item) => (
            <DropdownMenuCheckboxItem
              key={item.value}
              onClick={() => setTheme(item.value)}
              checked={item.value === resolvedTheme}
              className={
                "cursor-pointer hover:opacity-80 dark:focus:bg-dark-400 text-dark100_light900"
              }
            >
              <div className={"flex gap-2"}>
                <Image
                  src={item.icon}
                  width={16}
                  height={16}
                  alt={item.value}
                />
                <span>{item.label} </span>
              </div>
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Theme;
