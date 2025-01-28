"use client";

import { Editor } from "primereact/editor";
import React from "react";
import { Control, FieldValues, Path } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

interface TextEditorProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
}

const TextEditor = <T extends FieldValues>({
  control,
  name,
  label,
}: TextEditorProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && (
            <FormLabel className="text-darkGray xl:text-sm">{label}</FormLabel>
          )}
          <FormControl>
            <Editor
              value={field.value}
              onTextChange={(e) => {
                field.onChange(e.htmlValue);
              }}
              className="mt-1 bg-[#F4F4F4] border border-gray rounded-lg xl:rounded-10 overflow-hidden"
              style={{ height: "15rem", border: "none" }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TextEditor;
