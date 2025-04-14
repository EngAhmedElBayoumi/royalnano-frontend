import { useState } from "react";
import Image from "next/image";
import { Control, FieldValues, Path } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface PasswordInputProps<T extends FieldValues> {
  control?: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder: string;
  className?: string;
  readonly?: boolean;
}

const PasswordInput = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  className,
  readonly,
}: PasswordInputProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && (
            <FormLabel className="text-darkGray xl:text-sm">{label}</FormLabel>
          )}
          <div className="relative">
            <FormControl>
              <Input
                placeholder={placeholder}
                type={showPassword ? "text" : "password"}
                disabled={readonly}
                className="bg-[#F4F4F4] border-gray xl:rounded-10 px-2 py-5 xl:py-7 mt-1"
                {...field}
                onChange={(e) => field.onChange(e.target.value)}
              />
            </FormControl>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute ltr:right-0 rtl:left-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <Image
                  src="/assets/icons/hide.svg"
                  alt="hide-password"
                  width={20}
                  height={20}
                />
              ) : (
                <Image
                  src="/assets/icons/show.svg"
                  alt="hide-password"
                  width={20}
                  height={20}
                />
              )}
              <span className="sr-only">
                {showPassword ? "Hide password" : "Show password"}
              </span>
            </Button>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PasswordInput;
