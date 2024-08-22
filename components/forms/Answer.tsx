"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { answerSchema } from "@/schemas/answerSchema";
import { z } from "zod";
import RichTextEditor from "@/components/forms/RichTextEditor";
import { createAnswer } from "@/lib/actions/answer.action";
import toast from "react-hot-toast";
import askAI from "@/helpers/askAI";
import { useAuth } from "@clerk/nextjs";

interface Props {
  questionId: string;
  mongoUserId: string;
}

export default function Answer({ questionId, mongoUserId }: Props) {
  const { userId } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittingAI, setIsSubmittingAI] = useState(false);
  const editorRef = useRef(null);
  const [editorContent, setEditorContent] = useState("");
  const form = useForm<z.infer<typeof answerSchema>>({
    resolver: zodResolver(answerSchema),
    defaultValues: {
      answer: "",
    },
  });

  async function onSubmit(formData: z.infer<typeof answerSchema>) {
    try {
      setIsSubmitting(true);

      if (!mongoUserId) {
        toast.error("Login first to submit answer.");
      }

      await createAnswer({
        question: questionId,
        answer: formData.answer.trim(),
        author: mongoUserId,
      });

      form.reset();

      if (editorRef.current) {
        // @ts-ignore
        editorRef.current.setContent("");
      }

      toast.success("answer submitted.");
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  }

  const enhanceAnswer = async () => {
    if (!userId) {
      toast.error("Please Login First");
      return;
    }

    try {
      if (process.env.NEXT_PUBLIC_NODE_ENV !== "DEV") {
        toast.error("This feature is for DEV Mode only");
        return;
      }

      setIsSubmittingAI(true);
      const aiAnswer = await askAI(editorContent);

      if (editorRef.current) {
        const editor = editorRef.current as any;
        editor.setContent(aiAnswer);
      }
    } catch (error) {
      console.error(error);
      toast.error("Response Error from Chat-GPT");
    } finally {
      setIsSubmittingAI(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2 mt-6">
        <h4 className="paragraph-semibold text-dark400_light800">
          Write your answer here
        </h4>

        <Button
          className="btn light-border-2 gap-1.5 rounded-md px-4 py-2.5 text-primary-500 shadow-none dark:text-primary-500"
          onClick={enhanceAnswer}
          disabled={isSubmittingAI}
        >
          <Image
            src="/assets/icons/stars.svg"
            alt="star"
            width={12}
            height={12}
            className="object-contain"
          />
          {isSubmittingAI ? "Enhancing..." : "Enhance Your Answer"}
        </Button>
      </div>

      {/* Form */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-full gap-10 mt-4"
        >
          {/*Explanation Field*/}
          <FormField
            control={form.control}
            name={"answer"}
            render={({ field }) => (
              <FormItem className={"flex w-full flex-col gap-3"}>
                <FormControl className={"mt-6"}>
                  <RichTextEditor
                    ref={editorRef}
                    field={field}
                    setContent={setEditorContent}
                  />
                </FormControl>
                <FormMessage className={"text-red-500"} />
              </FormItem>
            )}
          />

          {/* Tags Field */}
          <Button
            type="submit"
            className={"primary-gradient w-fit !text-light-900"}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Answer"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
