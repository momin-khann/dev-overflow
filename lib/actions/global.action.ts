"use server";

import { asyncHandler } from "@/helpers/asyncHandler";
import { SearchQueryParams } from "@/types/params";
import { QuestionModel } from "@/models/question.model";
import { UserModel } from "@/models/user.model";
import { AnswerModel } from "@/models/answer.model";
import { TagModel } from "@/models/tag.model";

const SearchableTypes = ["question", "answer", "user", "tag"];

export const globalSearch = asyncHandler(async (params: SearchQueryParams) => {
  const { searchQuery, type } = params;
  const regexQuery = { $regex: searchQuery, $options: "i" };

  let results = [];

  const modelsAndTypes = [
    { model: QuestionModel, searchField: "title", type: "question" },
    { model: UserModel, searchField: "name", type: "user" },
    { model: AnswerModel, searchField: "answer", type: "answer" },
    { model: TagModel, searchField: "name", type: "tag" },
  ];

  const typeLower = type?.toLowerCase();

  if (!typeLower || !SearchableTypes.includes(typeLower)) {
    // SEARCH ACROSS EVERYTHING

    for (const { model, searchField, type } of modelsAndTypes) {
      const queryResults = await model
        .find({ [searchField]: regexQuery })
        .limit(2);

      results.push(
        ...queryResults.map((item) => ({
          title:
            type === "answer"
              ? `Answers containing ${searchQuery}`
              : item[searchField],
          type,
          id:
            type === "user"
              ? item.clerkid
              : type === "answer"
                ? item.question
                : item._id,
        })),
      );
    }
  } else {
    // SEARCH IN THE SPECIFIED MODEL TYPE
    const modelInfo = modelsAndTypes.find((item) => item.type === type);

    if (!modelInfo) {
      throw new Error("Invalid search type");
    }

    const queryResults = await modelInfo.model
      .find({ [modelInfo.searchField]: regexQuery })
      .limit(8);

    results = queryResults.map((item) => ({
      title:
        type === "answer"
          ? `Answers containing ${searchQuery}`
          : item[modelInfo.searchField],
      type,
      id:
        type === "user"
          ? item.clerkId
          : type === "answer"
            ? item.question
            : item._id,
    }));
  }

  return JSON.stringify(results);
});
