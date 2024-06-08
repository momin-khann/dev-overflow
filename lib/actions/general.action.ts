"use server";

import { asyncHandler } from "@/helpers/asyncHandler";
import { SearchQueryParams } from "@/types/params";

export const globalSearch = asyncHandler(async (params: SearchQueryParams) => {
  // const { searchQuery, type } = params;
  // const regexQuery = new RegExp(searchQuery, "i");
});
