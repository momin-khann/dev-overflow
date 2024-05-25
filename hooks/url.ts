import qs from "query-string";

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
