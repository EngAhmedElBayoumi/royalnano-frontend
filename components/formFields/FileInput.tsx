"use client";
import React, { useEffect } from "react";
import { Control, FieldValues, Path } from "react-hook-form";
import { isVideoUrl } from "@/lib/utils/isVideoUrl";
import Image from "next/image";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface FileInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  className?: string;
  accepted?: string;
}

const FileInput = <T extends FieldValues>({
  control,
  name,
  label,
  className,
  accepted,
}: FileInputProps<T>) => {
  const [file, setFile] = React.useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);

  useEffect(() => {
    const initialFile = control._formValues[name];
    if (initialFile instanceof File) {
      setFile(initialFile);
      setPreviewUrl(URL.createObjectURL(initialFile));
    } else if (typeof initialFile === "string" && initialFile) {
      setPreviewUrl(initialFile);
    }
  }, [control, name]);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={`relative ${className}`}>
          {label && (
            <FormLabel className="text-darkGray xl:text-sm">{label}</FormLabel>
          )}
          <FormControl>
            <Input
              type="file"
              accept={accepted}
              name={name}
              className="bg-[#F4F4F4] border-gray xl:rounded-10 px-1 py-[2px] xl:py-[10px] mt-1 h-fit cursor-pointer"
              onChange={(e) => {
                if (e.target.files) {
                  const selectedFile = e.target.files[0];
                  setFile(selectedFile);
                  field.onChange(selectedFile);
                }
              }}
            />
          </FormControl>
          <Image
            src="/assets/icons/dashboard/camera.svg"
            width="24"
            height="24"
            alt="icon"
            className="absolute top-9 ltr:right-2 rtl:left-2"
          />
          <FormMessage />
          {(file || previewUrl) && (
            <div className="mt-2 flex justify-center relative">
              {file?.type.startsWith("image/") ? (
                <Image
                  src={URL.createObjectURL(file)}
                  alt="Preview"
                  className="mt-2 h-[200px] object-contain"
                  width="200"
                  height="200"
                />
              ) : file?.type.startsWith("video/") ? (
                <video controls className="mt-2" width="200" height="200">
                  <source src={URL.createObjectURL(file)} type={file.type} />
                  Your browser does not support the video tag.
                </video>
              ) : previewUrl && isVideoUrl(previewUrl) ? (
                <video controls className="mt-2" width="500" height="300">
                  <source src={previewUrl} />
                  Your browser does not support the video tag.
                </video>
              ) : previewUrl ? (
                <Image
                  src={previewUrl}
                  alt="Preview"
                  className="mt-2 h-[200px] object-contain"
                  width="200"
                  height="200"
                />
              ) : null}
              <button
                type="button"
                onClick={() => {
                  setFile(null);
                  setPreviewUrl(null);
                  field.onChange(null);
                  (
                    document.querySelector(
                      `input[name="${name}"]`
                    ) as HTMLInputElement
                  ).value = "";
                }}
                className="mt-2 bg-primary text-white rounded-full p-1 absolute top-0 right-0"
              >
                <Image
                  src="/assets/icons/dashboard/close.svg"
                  alt="remove"
                  width="10"
                  height="10"
                />
              </button>
            </div>
          )}
        </FormItem>
      )}
    />
  );
};

export default FileInput;
