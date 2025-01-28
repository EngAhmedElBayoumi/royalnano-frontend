"use client";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
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
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Control, FieldValues, Path } from "react-hook-form";

interface DateTimePickerProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder: string;
  className?: string;
  disabledStartDate?: Date;
  disabledEndDate?: Date;
}
const DateTimePicker = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  className,
  disabledStartDate,
  disabledEndDate,
}: DateTimePickerProps<T>) => {
  function handleTimeChange(
    field: { value: Date | null; onChange: (value: Date) => void },
    type: "hour" | "minute" | "ampm",
    value: string
  ) {
    const currentDate = field.value || new Date();
    const newDate = new Date(currentDate);

    if (type === "hour") {
      const hour = parseInt(value, 10);
      newDate.setHours((hour % 12) + (newDate.getHours() >= 12 ? 12 : 0));
    } else if (type === "minute") {
      newDate.setMinutes(parseInt(value, 10));
    } else if (type === "ampm") {
      const hours = newDate.getHours();
      if (value === "AM" && hours >= 12) {
        newDate.setHours(hours - 12);
      } else if (value === "PM" && hours < 12) {
        newDate.setHours(hours + 12);
      }
    }

    const startDate = disabledStartDate || new Date(-8640000000000000);
    const endDate = disabledEndDate || new Date(8640000000000000);

    if (newDate >= startDate && newDate <= endDate) {
      field.onChange(newDate);
    }
  }

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
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "bg-[#F4F4F4] border-gray xl:rounded-10 px-2 py-5 xl:py-7",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    format(field.value, "MM/dd/yyyy hh:mm aa")
                  ) : (
                    <span>{placeholder}</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <div className="sm:flex">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={(date) => {
                    const startDate =
                      disabledStartDate || new Date(-8640000000000000); // Minimum date
                    const endDate =
                      disabledEndDate || new Date(8640000000000000); // Maximum date
                    return date > endDate || date < startDate;
                  }}
                  initialFocus
                />
                <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
                  <ScrollArea className="w-64 sm:w-auto">
                    <div className="flex sm:flex-col p-2">
                      {Array.from({ length: 12 }, (_, i) => i + 1)
                        .reverse()
                        .map((hour) => (
                          <Button
                            key={hour}
                            size="icon"
                            variant={
                              field.value &&
                              field.value.getHours() % 12 === hour % 12
                                ? "default"
                                : "ghost"
                            }
                            className="sm:w-full shrink-0 aspect-square"
                            onClick={() =>
                              handleTimeChange(field, "hour", hour.toString())
                            }
                          >
                            {hour}
                          </Button>
                        ))}
                    </div>
                    <ScrollBar orientation="horizontal" className="sm:hidden" />
                  </ScrollArea>
                  <ScrollArea className="w-64 sm:w-auto">
                    <div className="flex sm:flex-col p-2">
                      {Array.from({ length: 12 }, (_, i) => i * 5).map(
                        (minute) => (
                          <Button
                            key={minute}
                            size="icon"
                            variant={
                              field.value && field.value.getMinutes() === minute
                                ? "default"
                                : "ghost"
                            }
                            className="sm:w-full shrink-0 aspect-square"
                            onClick={() =>
                              handleTimeChange(
                                field,
                                "minute",
                                minute.toString()
                              )
                            }
                          >
                            {minute.toString().padStart(2, "0")}
                          </Button>
                        )
                      )}
                    </div>
                    <ScrollBar orientation="horizontal" className="sm:hidden" />
                  </ScrollArea>
                  <ScrollArea className="">
                    <div className="flex sm:flex-col p-2">
                      {["AM", "PM"].map((ampm) => (
                        <Button
                          key={ampm}
                          size="icon"
                          variant={
                            field.value &&
                            ((ampm === "AM" && field.value.getHours() < 12) ||
                              (ampm === "PM" && field.value.getHours() >= 12))
                              ? "default"
                              : "ghost"
                          }
                          className="sm:w-full shrink-0 aspect-square"
                          onClick={() => handleTimeChange(field, "ampm", ampm)}
                        >
                          {ampm}
                        </Button>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
export default DateTimePicker;
