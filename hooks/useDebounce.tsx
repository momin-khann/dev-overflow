"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";

type ReturnType = [string, Dispatch<SetStateAction<string>>];

export const useDebounce = (value: string, interval: number): ReturnType => {
  const [debounceValue, setDebounceValue] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, interval);

    return () => clearTimeout(timer);
  }, [value]);

  return [debounceValue, setDebounceValue];
};
