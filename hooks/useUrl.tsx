"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { createUrlQuery, removeKeysFromUrl } from "./url";

interface UrlParams {
  keyToAdd: string;
  keysToRemove?: string[];
}

export const useUrl = ({ keyToAdd, keysToRemove }: UrlParams) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get("q");

  const [urlQuery, setUrlQuery] = useState(query || "");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      let newUrl: string = "";

      if (urlQuery) {
        newUrl = createUrlQuery({
          params: searchParams.toString(),
          key: keyToAdd,
          value: urlQuery,
        });
      }
      // for keys to remove
      else if (keysToRemove) {
        newUrl = removeKeysFromUrl({
          params: searchParams.toString(),
          keysToRemove,
        });
      }

      router.push(newUrl, { scroll: false });
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [urlQuery, pathname, router, searchParams, query]);

  return { urlQuery, setUrlQuery };
};
