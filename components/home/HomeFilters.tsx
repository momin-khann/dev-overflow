"use client";

import React, { FunctionComponent, useState } from "react";
import { homePageFilters } from "@/data/filters";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { useUrl } from "@/hooks/useUrl";

const HomeFilters: FunctionComponent = () => {
  const filterParams = useSearchParams().get("filter");
  const [active, setActive] = useState(filterParams || "");

  const { setUrlQuery } = useUrl({
    keyToAdd: "filter",
    keysToRemove: ["filter"],
  });

  const handleClick = (item: string) => {
    if (active === item) {
      setActive("");
      setUrlQuery("");
      return;
    }
    setActive(item);
    setUrlQuery(item.toLowerCase());
  };

  return (
    <div className="mt-10 hidden flex-wrap gap-3 sm:flex">
      {homePageFilters.map((item) => (
        <Button
          key={item.value}
          onClick={() => handleClick(item.value)}
          className={`background-light800_dark300 body-medium rounded-lg px-6 py-3 capitalize shadow-none ${
            active === item.value
              ? "bg-primary-100 text-primary-500"
              : "bg-light-800 text-light-500"
          }`}
        >
          {item.name}
        </Button>
      ))}
    </div>
  );
};

export default HomeFilters;
