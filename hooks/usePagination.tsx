"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { createUrlQuery } from "@/hooks/url";

export const usePagination = (pageNumber: number) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  function navigate(direction: string) {
    const nextPageNumber =
      direction === "prev" ? pageNumber - 1 : pageNumber + 1;

    const newUrl = createUrlQuery({
      params: searchParams.toString(),
      key: "page",
      value: nextPageNumber.toString(),
    });

    router.push(newUrl);
  }

  return { navigate };
};
