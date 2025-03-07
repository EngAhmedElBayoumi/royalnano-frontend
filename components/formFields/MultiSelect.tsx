import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import Select from "react-select";
import { Control, FieldValues, Path } from "react-hook-form";

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder: string;
  options: Option[];
  className?: string;
  isDisabled?: boolean;
}

const MultiSelect = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  options,
  className,
  isDisabled,
}: MultiSelectProps<T>) => {
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
            <Select
              isMulti
              options={options}
              value={options.filter((option) =>
                field.value?.includes(option.value)
              )}
              onChange={(selectedOptions) => {
                const values = selectedOptions
                  ? (selectedOptions as Option[]).map((option) => option.value)
                  : [];

                field.onChange(values);
              }}
              placeholder={placeholder}
              isDisabled={isDisabled}
              className="mt-1"
              classNames={{
                control: () =>
                  "bg-[#F4F4F4] border-gray rounded-10 px-2 py-1 xl:py-2",
                placeholder: () => "text-gray",
                menu: () => "bg-[#F4F4F4] mt-1 rounded-10 border border-gray",
                option: (state) =>
                  `px-2 py-1 ${state.isFocused ? "bg-primary/10" : ""} ${
                    state.isSelected ? "bg-primary text-white" : ""
                  }`,
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default MultiSelect;
