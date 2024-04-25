"use client";

import React, { FunctionComponent } from "react";
import { homePageFilters } from "@/data/filters";
import { Button } from "@/components/ui/button";

interface OwnProps {}

type Props = OwnProps;

const HomeFilters: FunctionComponent<Props> = (props) => {
  const active = "frequent";

  return (
    <div className="mt-10 hidden flex-wrap gap-3 md:flex">
      {homePageFilters.map((item) => (
        <Button
          key={item.value}
          onClick={() => {}}
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
