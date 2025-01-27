"use client";

import {
  ClassicEditor,
  Context,
  Bold,
  Essentials,
  Italic,
  Paragraph,
  ContextWatchdog,
} from "ckeditor5";
import { CKEditor, CKEditorContext } from "@ckeditor/ckeditor5-react";
import "ckeditor5/ckeditor5.css";
import React from "react";
import { Controller, Control, FieldValues, Path } from "react-hook-form";

interface TextEditorProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
}

const TextEditor = <T extends FieldValues>({
  control,
  name,
}: TextEditorProps<T>) => {
  return (
    <CKEditorContext context={Context} contextWatchdog={ContextWatchdog}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <CKEditor
            editor={ClassicEditor}
            config={{
              licenseKey: "<YOUR_LICENSE_KEY>", // Or 'GPL'.
              plugins: [Essentials, Bold, Italic, Paragraph],
              toolbar: ["undo", "redo", "|", "bold", "italic"],
            }}
            data="<p>Hello from the CKEditor!</p>"
            onReady={(editor) => {
              console.log("CKEditor is ready to use!", editor);
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              field.onChange(data); // Update the field value on editor content change
            }}
          />
        )}
      />
    </CKEditorContext>
  );
};

export default TextEditor;
