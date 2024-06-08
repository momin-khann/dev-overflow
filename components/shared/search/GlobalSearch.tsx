"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import GlobalResult from "@/components/shared/search/GlobalResult";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useUrl } from "@/hooks/useUrl";

const GlobalSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const searchContainerRef = useRef(null);

  useClickOutside({
    ref: searchContainerRef,
    data: {
      setIsOpen,
    },
  });

  const { setUrlQuery } = useUrl({
    keyToAdd: "global",
    keysToRemove: ["global", "type"],
  });

  return (
    <div
      className="relative w-full max-w-[600px] max-lg:hidden"
      ref={searchContainerRef}
    >
      <div className="background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4">
        <Image
          src="/assets/icons/search.svg"
          alt="search"
          width={24}
          height={24}
          className="cursor-pointer"
        />

        <Input
          type="text"
          placeholder="Search globally"
          onChange={(e) => {
            const value = e.target.value;

            setUrlQuery(value);
            value === "" ? setIsOpen(false) : setIsOpen(true);
          }}
          className="paragraph-regular no-focus placeholder background-light800_darkgradient border-none shadow-none outline-none"
        />
      </div>
      {isOpen && <GlobalResult />}
    </div>
  );
};

export default GlobalSearch;
