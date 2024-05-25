"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import qs from "query-string";

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

/*
 *
 * Create UrlQuery Function
 *
 * */
interface UrlQueryParams {
  params: string;
  key: string;
  value: string | null;
}

export function createUrlQuery({ params, key, value }: UrlQueryParams) {
  // if null returns empty object
  const currentUrl = qs.parse(params);

  // assigning values to current object as key
  currentUrl[key] = value;

  return qs.stringifyUrl(
    { url: window.location.pathname, query: currentUrl },
    { skipNull: true },
  );
}

/*
 *
 * Remove Keys from URL function
 *
 * */
interface RemoveKeysParams {
  params: string;
  keysToRemove: Array<string>;
}

export function removeKeysFromUrl({ params, keysToRemove }: RemoveKeysParams) {
  const currentUrl = qs.parse(params);

  keysToRemove.map((key) => {
    delete currentUrl[key];
  });

  return qs.stringifyUrl(
    { url: window.location.pathname, query: currentUrl },
    { skipNull: true },
  );
}
