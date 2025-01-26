"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Controller, Control } from "react-hook-form";

interface TiptapEditorProps {
  control: Control<any>; // Adjust the type as needed
  name: string; // Adjust the type as needed
}

const TiptapEditor = ({ control, name }: TiptapEditorProps) => {
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
