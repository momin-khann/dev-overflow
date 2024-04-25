export const richTextEditor = {
  apiKey: process.env.NEXT_PUBLIC_TINYMCE_API_KEY,
  init: {
    height: 500,
    menubar: false,
    plugins: [
      "advlist",
      "autolink",
      "lists",
      "link",
      "image",
      "charmap",
      "preview",
      "anchor",
      "searchreplace",
      "visualblocks",
      "code",
      "fullscreen",
      "insertdatetime",
      "media",
      "table",
      "codesample",
      "wordcount",
    ],
    toolbar:
      "undo redo | blocks | " +
      "codesample | bold italic forecolor | alignleft aligncenter " +
      "alignright alignjustify | bullist numlist outdent indent | " +
      "removeformat | help",
    content_style:
      "body { font-family:Helvetica,Arial,sans-serif; font-size:16px }",
  },
};
