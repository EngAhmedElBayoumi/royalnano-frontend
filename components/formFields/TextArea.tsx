import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Control, FieldValues, Path } from "react-hook-form";

interface CustomTextAreaProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder: string;
  rows?: number;
  className?: string;
  readonly?: boolean;
}

const CustomTextArea = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  rows = 4,
  className,
  readonly,
}: CustomTextAreaProps<T>) => {
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
            <Textarea
              placeholder={placeholder}
              rows={rows}
              disabled={readonly}
              className="bg-[#F4F4F4] border-gray rounded-10 px-2 min-w-[270px] md:min-w-[400px] mt-1"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomTextArea;
