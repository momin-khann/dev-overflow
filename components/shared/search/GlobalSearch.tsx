"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import GlobalResult from "@/components/shared/search/GlobalResult";
import { useDebounce } from "@/hooks/useDebounce";
import { useClickOutside } from "@/hooks/useClickOutside";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const GlobalSearch = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [debounceValue, setDebounceValue] = useDebounce(searchTerm, 400);
  const params = new URLSearchParams(searchTerm);
  const searchContainerRef = useRef(null);

  useClickOutside({
    ref: searchContainerRef,
    dependency: pathname,
    data: {
      setSearchTerm,
      setIsOpen,
    },
  });

  let newPath: string = "";

  useEffect(() => {
    const filter = searchParams.get("filter");

    // if (debounceValue && filter) {
    //   newPath = `q=${searchTerm}&filter=${filter}`;
    // } else if (!debounceValue && filter) {
    //   params.delete("q");
    //   newPath = `filter=${filter}`;
    // } else if (debounceValue && !filter) {
    //   params.delete("filter");
    //   newPath = `q=${searchTerm}`;
    // } else {
    //   params.delete("q");
    // }

    router.replace(`?${newPath}`, { scroll: false });
  }, [debounceValue]);

  const handleSearch = (value: string) => {
    if (!value) {
      setIsOpen(false);
      setSearchTerm("");
      setDebounceValue("");
      return;
    }

    setIsOpen(true);
    setSearchTerm(value);
  };

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
          // defaultValue={""}
          onChange={(e) => handleSearch(e.target.value)}
          className="paragraph-regular no-focus placeholder background-light800_darkgradient border-none shadow-none outline-none"
        />
      </div>
      {isOpen && <GlobalResult />}
    </div>
  );
};

export default GlobalSearch;
