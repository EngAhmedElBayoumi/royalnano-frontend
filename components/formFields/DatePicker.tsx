// "use client";
// import { format } from "date-fns";
// import { CalendarIcon } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// import {
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { Control, FieldValues, Path } from "react-hook-form";

// interface DatePickerProps<T extends FieldValues> {
//   control: Control<T>;
//   name: Path<T>;
//   label?: string;
//   placeholder: string;
//   className?: string;
//   disabledStartDate?: Date;
//   disabledEndDate?: Date;
//   readonly?: boolean;
// }

// const DatePicker = <T extends FieldValues>({
//   control,
//   name,
//   label,
//   placeholder,
//   className,
//   disabledStartDate,
//   disabledEndDate,
//   readonly,
// }: DatePickerProps<T>) => {
//   return (
//     <FormField
//       control={control}
//       name={name}
//       render={({ field }) => (
//         <FormItem className={`flex flex-col ${className}`}>
//           <FormLabel className="text-darkGray xl:text-sm mt-1 mb-[6px]">
//             {label}
//           </FormLabel>
//           <Popover>
//             <PopoverTrigger asChild>
//               <FormControl disabled={readonly}>
//                 <Button
//                   variant={"outline"}
//                   className={cn(
//                     "bg-[#F4F4F4] border-gray xl:rounded-10 px-2 py-5 xl:py-7",
//                     !field.value && "text-muted-foreground"
//                   )}
//                 >
//                   {field.value ? (
//                     format(field.value, "PPP")
//                   ) : (
//                     <span>{placeholder}</span>
//                   )}
//                   <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
//                 </Button>
//               </FormControl>
//             </PopoverTrigger>
//             <PopoverContent className="w-auto p-0" align="start">
//               <Calendar
//                 mode="single"
//                 selected={field.value}
//                 onSelect={field.onChange}
//                 disabled={(date) => {
//                   const startDate =
//                     disabledStartDate || new Date(-8640000000000000); // Minimum date
//                   const endDate = disabledEndDate || new Date(8640000000000000); // Maximum date
//                   return date > endDate || date < startDate;
//                 }}
//                 initialFocus
//               />
//             </PopoverContent>
//           </Popover>
//           <FormMessage />
//         </FormItem>
//       )}
//     />
//   );
// };

// export default DatePicker;

"use client";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Control, FieldValues, Path } from "react-hook-form";

interface DatePickerProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder: string;
  className?: string;
  disabledStartDate?: Date;
  disabledEndDate?: Date;
  readonly?: boolean;
}

const DatePicker = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  className,
  disabledStartDate,
  disabledEndDate,
  readonly,
}: DatePickerProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={`flex flex-col ${className}`}>
          <FormLabel className="text-darkGray xl:text-sm mt-1 mb-[6px]">
            {label}
          </FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl disabled={readonly}>
                <Button
                  variant={"outline"}
                  className={cn(
                    "bg-[#F4F4F4] border-gray xl:rounded-10 px-2 py-5 xl:py-7",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    format(new Date(field.value), "PPP") 
                  ) : (
                    <span>{placeholder}</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value ? new Date(field.value) : null} 
                onSelect={(date) => {
                  field.onChange(format(date, "yyyy-MM-dd"));
                }}
                disabled={(date) => {
                  const startDate =
                    disabledStartDate || new Date(-8640000000000000); 
                  const endDate = disabledEndDate || new Date(8640000000000000); 
                  return date > endDate || date < startDate;
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DatePicker;

