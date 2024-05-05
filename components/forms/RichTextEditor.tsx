"use client";
import React, { forwardRef } from "react";
import { richTextEditor } from "@/lib/richTextEditor";
import { Editor } from "@tinymce/tinymce-react";
import { useTheme } from "@/context/ThemeProvider";

function RichTextEditor({ field }: any, ref: any) {
  const { mode } = useTheme();

  const skinColor = mode === "dark" ? "oxide-dark" : "snow";
  const contentColor = mode === "dark" ? "dark" : "default";

  return (
    <>
      <Editor
        key={mode}
        apiKey={richTextEditor.apiKey}
        onInit={(_evt, editor) => {
          // @ts-ignore
          ref.current = editor;
        }}
        // initialValue=""
        init={{
          skin: skinColor,
          content_css: contentColor,
          ...richTextEditor.init,
        }}
        onBlur={field.onBlur}
        onEditorChange={(content) => field.onChange(content)}
      />
    </>
  );
}

export default forwardRef(RichTextEditor);
