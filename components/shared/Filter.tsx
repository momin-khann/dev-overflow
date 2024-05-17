"use client";

import React, { FunctionComponent, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";

interface OwnProps {
  filters: {
    name: string;
    value: string;
  }[];
  otherClasses?: string;
  containerClasses?: string;
}

type Props = OwnProps;

const Filter: FunctionComponent<Props> = ({
  filters,
  otherClasses,
  containerClasses,
}) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);
  const [filter, setFilter] = useState(searchParams.get("filter"));

  let newPath = "";
  useEffect(() => {
    const searchQuery = searchParams.get("q");

    if (searchQuery && filter) {
      newPath = `q=${searchQuery}&filter=${filter}`;
    } else if (!searchQuery && filter) {
      params.delete("q");
      newPath = `filter=${filter}`;
    } else if (searchQuery && filter) {
      params.delete("filter");
      newPath = `q=${searchQuery}`;
    } else {
      params.delete("filter");
    }

    replace(`?${newPath}`, { scroll: false });
  }, [filter]);

  const handleChange = (value: string) => {
    setFilter(value);
  };

  return (
    <div className={`relative ${containerClasses}`}>
      <Select onValueChange={handleChange} defaultValue={filter || undefined}>
        <SelectTrigger
          className={`${otherClasses} body-regular light-border background-light800_dark300 text-dark500_light700 px-5 py-2.5`}
        >
          <div className="line-clamp-1 flex-1 text-left">
            <SelectValue placeholder="Select a Filter" />
          </div>
        </SelectTrigger>
        <SelectContent
          className={`text-dark100_light900 background-light800_dark300`}
        >
          <SelectGroup>
            {filters.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Filter;
