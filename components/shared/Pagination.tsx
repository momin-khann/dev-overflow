"use client";

import React from "react";
import { Button } from "@/components/ui/button";

interface Props {
  pageNumber: number;
  isNext: boolean;
}

const Pagination = ({ pageNumber, isNext }: Props) => {
  // custom hook for pagination
  const { navigate } = usePagination(pageNumber);

  return (
    <div className="flex w-full items-center justify-center gap-2 my-6">
      <Button
        disabled={pageNumber === 1}
        onClick={() => navigate("prev")}

        className="light-border-2 btn flex min-h-[36px] items-center justify-center gap-2 border"
      >
        <p className="body-medium text-dark200_light800">Prev</p>
      </Button>
      <div className="flex items-center justify-center rounded-md bg-primary-500 px-3.5 py-2">
        <p className="body-semibold text-light-900">{pageNumber}</p>
      </div>
      <Button
        disabled={!isNext}
        onClick={() => navigate("next")}
        className="light-border-2 btn flex min-h-[36px] items-center justify-center gap-2 border"
      >
        <p className="body-medium text-dark200_light800">Next</p>
      </Button>
    </div>
  );
};
export default Pagination;
