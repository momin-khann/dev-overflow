"use client";

import React, { FunctionComponent, useRef, useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { questionSchema } from "@/schemas/questionSchema";
import { z } from "zod";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import toast from "react-hot-toast";
import { getUserById } from "@/lib/actions/user.action";
import { createQuestion, editQuestion } from "@/lib/actions/question.action";
import RichTextEditor from "@/components/forms/RichTextEditor";
import { QuestionType } from "@/types";
import { useRouter } from "next/navigation";
import { getMongoUserId } from "@/helpers/getMongoUser";

interface Props {
  mongoUserId?: string;
  type?: string;
  questionDetails?: any;
}
const Question: FunctionComponent<Props> = ({
  questionDetails,
  mongoUserId,
  type,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const editorRef = useRef(null);
  const router = useRouter();

  const parsedQuestion = JSON.parse(questionDetails);
  const initialTags = parsedQuestion.tags.map((tag: any) => tag.name);

  // 1. Define your form.
  const form = useForm<z.infer<typeof questionSchema>>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      title: parsedQuestion.title || "",
      description: parsedQuestion.description || "",
      tags: initialTags || [],
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(formData: z.infer<typeof questionSchema>) {
    setIsSubmitting(true);
    try {
      if (type === "edit") {
        await editQuestion({
          questionId: parsedQuestion._id,
          title: formData.title,
          description: formData.description,
          path: "/question/${parsedQuestion._id}",
        });

        router.push(`/question/${parsedQuestion._id}`);
      } else {
        await createQuestion({
          title: formData.title,
          description: formData.description,
          author: mongoUserId,
          tags: formData.tags,
          path: "/",
        });

        router.push("/");
      }

      // pop-up with sweet alert and then navigate to home page.
      toast.success("Question created successfully.");

      form.reset();

      if (editorRef.current) {
        // @ts-ignore
        editorRef.current.setContent("");
      }
    } catch (error) {
      toast.error("Error submitting Question");
      console.error("Error submitting Question. " + error);
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleKeyDownPress(
    event: React.KeyboardEvent<HTMLInputElement>,
    field: ControllerRenderProps<z.infer<typeof questionSchema>, "tags">,
  ) {
    // extract value from tagInput
    if (event.key === "Enter" && field.name === "tags") {
      event.preventDefault();

      const tagInput = event.target as HTMLInputElement;
      const tagValue = tagInput.value.trim();

      if (tagValue === "") {
        return form.setError("tags", {
          type: "required",
          message: "Tag must not be empty.",
        });
      }

      if (tagValue.length < 3) {
        return form.setError("tags", {
          type: "required",
          message: "Tag must be at least 3 characters.",
        });
      }

      if (tagValue.length > 15) {
        return form.setError("tags", {
          type: "required",
          message: "Tag must be less than 15 characters.",
        });
      }

      if (!field.value.includes(tagValue)) {
        form.setValue("tags", [...field.value, tagValue]);
        tagInput.value = "";
        form.clearErrors("tags");
      }
    }
  }

  function handleTagRemove(
    tag: string,
    field: ControllerRenderProps<z.infer<typeof questionSchema>, "tags">,
  ) {
    const newTags = field.value.filter((item) => item !== tag);

    form.setValue("tags", newTags);
  }

  return (
    <div>
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col w-full gap-10"
          >
            {/*Question title Input field*/}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className={"flex flex-col w-full"}>
                  <FormLabel
                    className={"paragraph-semibold text-dark400_light800"}
                  >
                    Question Title
                    <span className={"text-primary-500"}>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter here..."
                      {...field}
                      className={
                        "no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                      }
                    />
                  </FormControl>

                  <FormDescription
                    className={"body-regular mt-2.5 text-light-500"}
                  >
                    Be specific and imagine you&apos;re asking a question to
                    another person.
                  </FormDescription>
                  <FormMessage className={"text-red-500"} />
                </FormItem>
              )}
            />

            {/*Explanation Field*/}
            <FormField
              control={form.control}
              name={"description"}
              render={({ field }) => (
                <FormItem className={"flex w-full flex-col gap-3"}>
                  <FormLabel
                    className={"paragraph-semibold text-dark400_light800"}
                  >
                    Detailed Explanation of your problem
                    <span className={"text-primary-500"}>*</span>
                  </FormLabel>
                  <FormControl className={"mt-3.5"}>
                    <RichTextEditor
                      ref={editorRef}
                      field={field}
                      initialValue={parsedQuestion.description || ""}
                    />
                  </FormControl>
                  <FormDescription
                    className={"body-regular mt-2.5 text-light-500"}
                  >
                    Introduce the problem and expand on what you put in the
                    title. Minimum 20 characters.
                  </FormDescription>
                  <FormMessage className={"text-red-500"} />
                </FormItem>
              )}
            />

            {/* Tags Field */}
            <FormField
              control={form.control}
              name={"tags"}
              render={({ field }) => (
                <FormItem className={"flex w-full flex-col"}>
                  <FormLabel
                    className={"paragraph-semibold text-dark400_light800"}
                  >
                    Tags
                    <span className={"text-primary-500"}>*</span>
                  </FormLabel>
                  <FormControl className={"mt-3.5"}>
                    <Input
                      disabled={type === "edit"}
                      className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                      placeholder={"Add tags..."}
                      onKeyDown={(event) => handleKeyDownPress(event, field)}
                    />
                  </FormControl>

                  {/*TODO: Tags */}
                  {field.value.length > 0 && (
                    <div className={"flex-start mt-2.5 gap-2.5"}>
                      {field.value.map((tag) => (
                        <Badge
                          key={tag}
                          className="subtle-medium background-light800_dark300 text0light400_light500 flex items-center justify-center gap-2 rounded-md border-none px-4 py-2 uppercase"
                        >
                          {tag}
                          <Image
                            src={"/assets/icons/close.svg"}
                            alt={"close icon"}
                            height={12}
                            width={12}
                            className="cursor-pointer object-contain invert-0 dark:invert"
                            onClick={() => handleTagRemove(tag, field)}
                          />
                        </Badge>
                      ))}
                    </div>
                  )}

                  <FormDescription
                    className={"body-regular mt-2.5 text-light-500"}
                  >
                    Introduce the problem and expand on what you put in the
                    title. Minimum 20 characters.
                  </FormDescription>
                  <FormMessage className={"text-red-500"} />
                </FormItem>
              )}
            />

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
    </div>
  );
};

export default Question;
