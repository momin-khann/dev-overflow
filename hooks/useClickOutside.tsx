"use client";

import { useEffect } from "react";

export const useClickOutside = ({ ref, data }: any) => {
  const { setIsOpen } = data;
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, []);
};
