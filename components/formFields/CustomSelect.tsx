import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Control, FieldValues, Path } from "react-hook-form";

interface CustomSelectProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder: string;
  options: { value: string; label: string }[];
  readonly?: boolean;
}

const CustomSelect = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  options,
  readonly,
}: CustomSelectProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const selectedLabel =
          options.find((opt) => opt.value === field.value)?.label ||
          placeholder;

        return (
          <FormItem>
            {label && (
              <FormLabel className="text-darkGray xl:text-sm">
                {label}
              </FormLabel>
            )}
            <FormControl>
              <Select
                onValueChange={field.onChange}
                value={field.value}
                disabled={readonly}
              >
                <SelectTrigger
                  className={`mt-1 bg-[#F4F4F4] border-gray rounded-10 px-2 py-5 xl:py-7 min-w-[270px] md:min-w-[400px] ${
                    !field.value ? "text-gray" : ""
                  }`}
                >
                  {selectedLabel}
                </SelectTrigger>
                <SelectContent>
                  {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default CustomSelect;
