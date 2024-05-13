"use client";

import { Input } from "@/components/ui/input";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";

interface CustomInputProps {
  route?: string;
  iconPosition: string;
  imgSrc?: string;
  placeholder?: string;
  otherClasses?: string;
}

const LocalSearchbar = ({
  // route = "/",
  iconPosition,
  imgSrc = "/assets/icons/search.svg",
  placeholder,
  otherClasses,
}: CustomInputProps) => {
  // states
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [debounceValue, setDebounceValue] = useDebounce(searchTerm, 4000);
  const params = new URLSearchParams();

  useEffect(() => {
    debounceValue ? params.set("q", debounceValue) : params.delete("q");

    replace(`?${params}`);
  }, [debounceValue]);

  function handleSearch(value: string) {
    if (!value) {
      setSearchTerm("");
      setDebounceValue("");
    }

    setSearchTerm(value);
  }

  return (
    <div
      className={`background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`}
    >
      {iconPosition === "left" && (
        <Image
          src={imgSrc}
          alt="search icon"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      )}

      <Input
        type="text"
        placeholder={placeholder}
        defaultValue={searchParams.get("q")?.toString()}
        onChange={(e) => handleSearch(e.target.value)}
        className="paragraph-regular no-focus placeholder background-light800_darkgradient border-none shadow-none outline-none"
      />

      {iconPosition === "right" && (
        <Image
          src={imgSrc}
          alt="search icon"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      )}
    </div>
  );
};

export default LocalSearchbar;
