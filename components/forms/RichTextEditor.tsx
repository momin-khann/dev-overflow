"use client";
import React, { forwardRef, Suspense } from "react";
import { richTextEditor } from "@/lib/richTextEditor";
import { Editor } from "@tinymce/tinymce-react";
import { useTheme } from "next-themes";
import Spinner from "@/components/shared/Spinner";

function RichTextEditor({ field, initialValue }: any, ref: any) {
  const { resolvedTheme: mode } = useTheme();

  const skinColor = mode === "dark" ? "oxide-dark" : "snow";
  const contentColor = mode === "dark" ? "dark" : "default";

  return (
    <>
      <Suspense fallback={<Spinner />}>
        <Editor
          key={mode}
          apiKey={richTextEditor.apiKey}
          initialValue={initialValue}
          onInit={(_evt, editor) => {
            // @ts-ignore
            ref.current = editor;
          }}
          init={{
            skin: skinColor,
            content_css: contentColor,
            ...richTextEditor.init,
          }}
          onBlur={field.onBlur}
          onEditorChange={(content) => field.onChange(content)}
        />
      </Suspense>
    </>
  );
}

export default forwardRef(RichTextEditor);
