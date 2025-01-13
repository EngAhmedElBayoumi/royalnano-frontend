import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { Control, FieldValues, Path } from "react-hook-form";

interface PhoneInputFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  defaultCountry?: string;
  className?: string;
}

const PhoneInputField = <T extends FieldValues>({
  control,
  name,
  label,
  defaultCountry = "eg",
  className,
}: PhoneInputFieldProps<T>) => {
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
            <PhoneInput
              defaultCountry={defaultCountry}
              value={field.value}
              onChange={field.onChange}
              className="mt-1"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PhoneInputField;
