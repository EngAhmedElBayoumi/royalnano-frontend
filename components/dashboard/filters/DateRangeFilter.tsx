"use client";

import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DateRangeFilterProps {
  value?: {
    period?: string;
    date_from?: string;
    date_to?: string;
  };
  onChange: (value: {
    period?: string;
    date_from?: string;
    date_to?: string;
  }) => void;
  className?: string;
}

const PRESET_PERIODS = [
  { value: "today", label: "Today" },
  { value: "yesterday", label: "Yesterday" },
  { value: "last_7_days", label: "Last 7 Days" },
  { value: "last_30_days", label: "Last 30 Days" },
  { value: "last_90_days", label: "Last 90 Days" },
  { value: "this_month", label: "This Month" },
  { value: "last_month", label: "Last Month" },
  { value: "this_year", label: "This Year" },
  { value: "last_year", label: "Last Year" },
  { value: "custom", label: "Custom Range" },
];

export function DateRangeFilter({
  value = {},
  onChange,
  className,
}: DateRangeFilterProps) {
  const [date, setDate] = useState<DateRange | undefined>(() => {
    if (value.date_from && value.date_to) {
      return {
        from: new Date(value.date_from),
        to: new Date(value.date_to),
      };
    }
    return undefined;
  });

  const handlePeriodChange = (period: string) => {
    if (period === "custom") {
      onChange({
        period,
        date_from: date?.from ? format(date.from, "yyyy-MM-dd") : undefined,
        date_to: date?.to ? format(date.to, "yyyy-MM-dd") : undefined,
      });
    } else {
      onChange({ period });
    }
  };

  const handleDateChange = (newDate: DateRange | undefined) => {
    setDate(newDate);
    if (value.period === "custom" && newDate?.from && newDate?.to) {
      onChange({
        period: "custom",
        date_from: format(newDate.from, "yyyy-MM-dd"),
        date_to: format(newDate.to, "yyyy-MM-dd"),
      });
    }
  };

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Select value={value.period || "last_30_days"} onValueChange={handlePeriodChange}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select period" />
        </SelectTrigger>
        <SelectContent>
          {PRESET_PERIODS.map((period) => (
            <SelectItem key={period.value} value={period.value}>
              {period.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {value.period === "custom" && (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "w-[300px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date range</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={handleDateChange}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}

