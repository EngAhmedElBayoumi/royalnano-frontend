"use client";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Control, FieldValues, Path } from "react-hook-form";
import { Input } from "@/components/ui/input";
import Image from "next/image";

interface FileInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  className?: string;
}

const FileInput = <T extends FieldValues>({
  control,
  name,
  label,
  className,
}: FileInputProps<T>) => {
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
              className="bg-[#F4F4F4] border-[0.6] border-gray xl:rounded-10 px-1 py-[2px] xl:py-[10px] mt-1 h-fit cursor-pointer"
              onChange={(e) => {
                if (e.target.files) {
                  field.onChange(e.target.files[0]);
                }
              }}
            />
          </FormControl>
          <Image
            src="/assets/icons/dashboard/camera.svg"
            width="24"
            height="24"
            alt="icon"
            className="absolute top-9 right-2"
          />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FileInput;
