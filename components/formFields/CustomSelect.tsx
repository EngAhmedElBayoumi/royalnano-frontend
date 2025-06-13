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
  SelectValue,
} from "@/components/ui/select";
import { Control, FieldValues, Path } from "react-hook-form";

interface CustomSelectProps<T extends FieldValues> {
  control?: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder: string;
  className?: string;
  options: { value: string; label: string }[];
  readonly?: boolean;
  value?: string | number;
  onChange?: (value: string | number) => void;
  valueType?: "string" | "number";
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
  className,
  valueType = "string",
}: CustomSelectProps<T>) => {
  if (control) {
    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => {
          const fieldValueString = field.value?.toString();

          return (
            <FormItem>
              {label && (
                <FormLabel className="text-darkGray xl:text-sm">
                  {label}
                </FormLabel>
              )}
              <FormControl>
                <Select
                  onValueChange={(val) => {
                    const newValue =
                      valueType === "number" ? parseFloat(val) : val;
                    field.onChange(newValue);
                  }}
                  value={fieldValueString}
                  disabled={readonly}
                >
                  <SelectTrigger
                    className={`mt-1 bg-[#F4F4F4] border-gray rounded-10 px-2 py-5 xl:py-7 rtl:flex-row-reverse ${
                      !field.value ? "text-gray" : ""
                    }`}
                  >
                    <SelectValue
                      placeholder={
                        options.find((opt) => opt.value === fieldValueString)
                          ?.label || placeholder
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {options.map((option) => (
                      <SelectItem
                        key={`select-item-${option.value}`}
                        value={option.value}
                      >
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
  }

  // no form context case: no FormItem / FormControl
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && <label className="text-darkGray xl:text-sm">{label}</label>}
      <Select
        onValueChange={(val) => {
          const newValue = valueType === "number" ? parseFloat(val) : val;
          onChange?.(newValue);
        }}
        value={value?.toString()}
        disabled={readonly}
      >
        <SelectTrigger
          className={`bg-[#F4F4F4] border-gray rounded-10 xl:py-7 min-w-[80px] ${
            !value ? "text-gray" : ""
          }`}
        >
          <SelectValue
            placeholder={
              options.find((opt) => opt.value === value?.toString())?.label ||
              placeholder
            }
          />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CustomSelect;
