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
        <FormItem className={className}>
          {label && (
            <FormLabel className="text-darkGray xl:text-sm">{label}</FormLabel>
          )}
          <FormControl>
            <Input
              type="file"
              className="bg-[#F4F4F4] border-[0.6] border-gray xl:rounded-10 px-2 py-5 xl:py-7 mt-1"
              onChange={(e) => {
                if (e.target.files) {
                  field.onChange(e.target.files[0]);
                }
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FileInput;
