"use client";

import React, { FunctionComponent, useEffect, useState } from "react";
import { homePageFilters } from "@/data/filters";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

const HomeFilters: FunctionComponent = () => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const { replace } = useRouter();
  const [active, setActive] = useState(searchParams.get("filter") || "newest");
  const [filter, setFilter] = useState("");

  let newPath: string = "";

  useEffect(() => {
    const searchQuery = searchParams.get("q");

    if (searchQuery && filter) {
      newPath = `q=${searchQuery}&filter=${filter}`;
    } else if (!searchQuery && filter) {
      params.delete("q");
      newPath = `filter=${filter}`;
    } else if (searchQuery && !filter) {
      params.delete("filter");
      newPath = `q=${searchQuery}`;
    } else {
      params.delete("filter");
    }

    replace(`?${newPath}`, { scroll: false });
  }, [filter]);

  const handleClick = (value: string) => {
    setActive(value);
    setFilter(value);
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
