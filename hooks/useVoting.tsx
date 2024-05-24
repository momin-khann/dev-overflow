"use client";

import { useEffect } from "react";
import { viewQuestion } from "@/lib/actions/interaction.action";
import { saveQuestion } from "@/lib/actions/user.action";
import { downvoteAnswer, upvoteAnswer } from "@/lib/actions/answer.action";
import {
  downvoteQuestion,
  upvoteQuestion,
} from "@/lib/actions/question.action";
import { usePathname } from "next/navigation";

interface Props {
  type: "question" | "answer";
  itemId: string;
  userId: string;
  hasUpVoted: boolean;
  hasDownVoted: boolean;
}

export const useVoting = (params: Props) => {
  const { type, itemId, userId, hasUpVoted, hasDownVoted } = params;

  const path = usePathname();

  useEffect(() => {
    if (type === "question") {
      viewQuestion({
        questionId: itemId,
        userId: userId ?? undefined,
      });
    }
  }, [itemId, userId, path]);

  async function handleVote(action: "upvote" | "downvote") {
    if (!userId) return;

    action === "upvote" ? upvote(type) : downvote(type);
  }

  async function upvote(type: "question" | "answer") {
    type === "question"
      ? await upvoteQuestion({
          questionId: itemId,
          userId,
          hasUpVoted,
          hasDownVoted,
        })
      : await upvoteAnswer({
          answerId: itemId,
          userId,
          hasUpVoted,
          hasDownVoted,
          path,
        });
  }

  async function downvote(type: "question" | "answer") {
    type === "question"
      ? await downvoteQuestion({
          questionId: itemId,
          userId,
          hasUpVoted,
          hasDownVoted,
        })
      : await downvoteAnswer({
          answerId: itemId,
          userId,
          hasUpVoted,
          hasDownVoted,
          path,
        });
  }

  async function handleSave() {
    await saveQuestion({
      userId,
      questionId: itemId,
      path,
    });
  }

  return { handleSave, handleVote };
};
