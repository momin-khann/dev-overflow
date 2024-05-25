"use client";

import { useEffect } from "react";

export const useClickOutside = ({ ref, dependency, data }: any) => {
  const { setIsOpen, setSearchTerm } = data;
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, [dependency]);
};
