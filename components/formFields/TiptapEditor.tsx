"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import { Controller, Control, FieldValues, Path } from "react-hook-form";

interface TiptapEditorProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
}

const TiptapEditor = <T extends FieldValues>({
  control,
  name,
}: TiptapEditorProps<T>) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Hello World!</p>",
  });

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className="border p-4 rounded">
          <EditorContent
            editor={editor}
            onChange={() => {
              // Update the field value on editor content change
              if (editor) {
                field.onChange(editor.getHTML());
              }
            }}
          />
        </div>
      )}
    />
  );
};

export default TiptapEditor;
