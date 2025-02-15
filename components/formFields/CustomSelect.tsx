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
  control?: Control<T>; 
  name: Path<T>;
  label?: string;
  placeholder: string;
  className?:string;
  options: { value: string; label: string }[];
  readonly?: boolean;
  value?: string; 
  onChange?: (value: string) => void; 
}

const CustomSelect = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  options,
  readonly,
  value,
  onChange,
  className
}: CustomSelectProps<T>) => {
  return control ? (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const selectedLabel =
          options.find((opt) => opt.value === field.value)?.label ||
          placeholder;

        return (
          <FormItem > 
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
  ) : (
    <FormItem>
      {label && <FormLabel className="text-darkGray xl:text-sm">{label}</FormLabel>}
      <FormControl>
        <Select
          onValueChange={onChange}
          value={value}
          disabled={readonly}
        >
          <SelectTrigger
            className={` bg-[#F4F4F4] border-gray rounded-10   xl:py-7 min-w-[80px]  ${
              !value ? "text-gray" : ""
            } ${className}`}
          >
            {options.find((opt) => opt.value === value)?.label || placeholder}
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
    </FormItem>
  );
};

export default CustomSelect;
