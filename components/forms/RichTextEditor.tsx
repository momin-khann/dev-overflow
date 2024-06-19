"use client";
import React, { forwardRef, useState } from "react";
import { richTextEditor } from "@/lib/richTextEditor";
import { Editor } from "@tinymce/tinymce-react";
import { useTheme } from "next-themes";
import Spinner from "@/components/shared/Spinner";

function RichTextEditor({ field, initialValue }: any, ref: any) {
  const { resolvedTheme: mode } = useTheme();
  const [loading, setLoading] = useState(true);

  const skinColor = mode === "dark" ? "oxide-dark" : "snow";
  const contentColor = mode === "dark" ? "dark" : "default";

  return (
    <>
      {loading && <Spinner />}

      <Editor
        key={mode}
        apiKey={richTextEditor.apiKey}
        initialValue={initialValue}
        onInit={(_evt, editor) => {
          // @ts-ignore
          setLoading(false)
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
    </>
  );
}

export default forwardRef(RichTextEditor);
