"use client";

import { useEffect, useState } from "react";

export const useDebounce = (value: string, interval: number) => {
  const [debounceValue, setDebounceValue] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, interval);

    return () => clearTimeout(timer);
  }, [value]);

  return { debounceValue, setDebounceValue };
};
