import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, FieldValues, Path } from "react-hook-form";

interface TextInputProps<T extends FieldValues> {
  control?: Control<T>;
  name?: Path<T>;
  label?: string;
  placeholder: string;
  type?: string;
  className?: string;
  readonly?: boolean;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text",
  className,
  readonly,
  value,
  onChange,
}: TextInputProps<T>) => {
  if (control && name) {
    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className={className}>
            {label && (
              <FormLabel className="text-darkGray xl:text-sm">
                {label}
              </FormLabel>
            )}
            <FormControl>
              <Input
                placeholder={placeholder}
                type={type}
                disabled={readonly}
                className="bg-[#F4F4F4] border-gray xl:rounded-10 px-2 py-5 xl:py-7 mt-1"
                {...field}
                onChange={(e) => {
                  if (type === "number") {
                    field.onChange(parseInt(e.target.value, 10));
                  } else {
                    field.onChange(e.target.value);
                  }
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  return (
    <FormItem className={className}>
      {label && (
        <FormLabel className="text-darkGray xl:text-sm">{label}</FormLabel>
      )}
      <Input
        placeholder={placeholder}
        type={type}
        disabled={readonly}
        className="bg-[#F4F4F4] border-gray xl:rounded-10 px-2 py-5 xl:py-7 mt-1"
        value={value}
        onChange={onChange}
      />
    </FormItem>
  );
};

export default TextInput;
