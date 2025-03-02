"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Control, FieldValues, Path } from "react-hook-form";

interface SwitchProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  className?: string;
}
const SwitchField = <T extends FieldValues>({
  control,
  name,
  label,
  className,
}: SwitchProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={`flex flex-row items-center justify-between ${className}`}
        >
          <FormLabel className="text-base">{label}</FormLabel>

          <FormControl>
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
              dir="ltr"
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};
export default SwitchField;
