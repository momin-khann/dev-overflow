"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useTheme } from "@/context/ThemeProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { answerSchema } from "@/schemas/answerSchema";
import { z } from "zod";
import RichTextEditor from "@/components/forms/RichTextEditor";

const type: string = "create";

export default function Answer() {
  const { mode } = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const editorRef = useRef(null);
  const form = useForm<z.infer<typeof answerSchema>>({
    resolver: zodResolver(answerSchema),
    defaultValues: {
      answer: "",
    },
  });

  const skinColor = mode === "dark" ? "oxide-dark" : "snow";
  const contentColor = mode === "dark" ? "dark" : "default";

  function onSubmit(formData: z.infer<typeof answerSchema>) {
    try {
      setIsSubmitting(true);

      console.log(formData);
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <h4 className="paragraph-semibold text-dark400_light800">
          Write your answer here
        </h4>

        <Button
          className="btn light-border-2 gap-1.5 rounded-md px-4 py-2.5 text-primary-500 shadow-none dark:text-primary-500"
          // onClick={() => {}}
        >
          <Image
            src="/assets/icons/stars.svg"
            alt="star"
            width={12}
            height={12}
            className="object-contain"
          />
          Generate an AI Answer
        </Button>
      </div>

      {/* Form */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-full gap-10"
        >
          {/*Explanation Field*/}
          <FormField
            control={form.control}
            name={"answer"}
            render={({ field }) => (
              <FormItem className={"flex w-full flex-col gap-3"}>
                <FormLabel
                  className={"paragraph-semibold text-dark400_light800"}
                >
                  Write your answer here
                  <span className={"text-primary-500"}>*</span>
                </FormLabel>
                <FormControl className={"mt-3.5"}>
                  <RichTextEditor ref={editorRef} field={field} />
                </FormControl>
                <FormDescription
                  className={"body-regular mt-2.5 text-light-500"}
                >
                  Introduce the problem and expand on what you put in the title.
                  Minimum 20 characters.
                </FormDescription>
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
            {isSubmitting ? (
              <> {type === "edit" ? "Editing..." : "Posting..."} </>
            ) : (
              <>{type === "edit" ? "Edit Question" : "Ask a Question"}</>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
