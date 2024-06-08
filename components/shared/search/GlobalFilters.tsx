"use client";

import { globalSearchFilters } from "@/data/filters";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useUrl } from "@/hooks/useUrl";

const GlobalFilters = () => {
  const typeParams = useSearchParams().get("type");
  const [active, setActive] = useState(typeParams || "");

  const { setUrlQuery } = useUrl({
    keyToAdd: "type",
    keysToRemove: ["type"],
  });

  const handleTypeClick = (item: string) => {
    if (active === item) {
      setActive("");
      setUrlQuery("");
      return;
    }
    setActive(item);
    setUrlQuery(item.toLowerCase());
  };

  return (
    <div className="flex items-center gap-5 px-5">
      <p className="text-dark400_light900 body-medium">Type: </p>
      <div className="flex gap-3">
        {globalSearchFilters.map((item) => (
          <button
            type="button"
            key={item.value}
            className={`light-border-2 small-regular !text-[0.85rem] dark:text-light-800 rounded-2xl px-5 py-2 capitalize dark:hover:text-primary-500
              ${
                active === item.value
                  ? "bg-primary-500 text-light-900"
                  : "bg-light-700 text-dark-400 hover:text-primary-500 dark:bg-dark-300"
              }
            `}
            onClick={() => handleTypeClick(item.value)}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GlobalFilters;
