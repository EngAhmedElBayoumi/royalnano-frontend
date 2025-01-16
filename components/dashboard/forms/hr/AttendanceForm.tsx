"use client";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { attendanceSchema } from "@/lib/validations/dashboard/hr/attendanceSchema";
import CustomButton from "@/components/formFields/CustomButton";
import TextInput from "@/components/formFields/TextInput";
import DateTimePicker from "@/components/formFields/DateTimePicker";
import Link from "next/link";
import { useEffect } from "react";

interface AttendanceFormProps {
  onSubmit: (data: AttendanceFormValues) => Promise<void>;
  defaultValues?: AttendanceFormValues;
}

export interface AttendanceFormValues {
  name: string;
  attendance: Date;
  departure: Date;
  working_hours: number;
}

const AttendanceForm = ({ onSubmit, defaultValues }: AttendanceFormProps) => {
  const form = useForm({
    resolver: zodResolver(attendanceSchema),
    defaultValues: defaultValues || {
      name: "",
      attendance: new Date(),
      departure: new Date(),
      working_hours: 0,
    },
  });

  // Watch for changes in attendance, departure, and working_hours
  const attendance = form.watch("attendance");
  const departure = form.watch("departure");
  const workingHours = form.watch("working_hours");

  useEffect(() => {
    if (attendance && departure) {
      const hours =
        (departure.getTime() - attendance.getTime()) / (1000 * 60 * 60);
      form.setValue("working_hours", hours);
    }
  }, [attendance, departure, form]);

  useEffect(() => {
    if (attendance) {
      const newDeparture = new Date(
        attendance.getTime() + workingHours * 60 * 60 * 1000
      );
      form.setValue("departure", newDeparture);
    }
    // eslint-disable-next-line
  }, [workingHours, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <section className="min-h-[60vh]">
          <div className="grid sm:grid-cols-2 gap-x-4 gap-y-2 xl:gap-y-5 lg:gap-x-10">
            <TextInput
              control={form.control}
              name="name"
              label="Name"
              placeholder="Name"
            />
            <TextInput
              control={form.control}
              name="working_hours"
              label="Working Hours"
              placeholder="Working Hours"
              type="number"
            />
            <DateTimePicker
              control={form.control}
              name="attendance"
              label="Attendance"
              placeholder="Select Attendance Time"
              disabledEndDate={form.watch("departure")}
            />
            <DateTimePicker
              control={form.control}
              name="departure"
              label="Departure"
              placeholder="Select Departure Time"
              disabledStartDate={form.watch("attendance")}
            />
          </div>
        </section>
        <div className="flex justify-end gap-2 mt-5">
          <Link href="/dashboard/hr" passHref>
            <CustomButton
              text="Cancel"
              type="reset"
              className="text-white rounded-lg bg-secondary min-w-[160px] xl:min-w-[222px] font-bold text-sm xl:text-[20px]"
            />
          </Link>

          <CustomButton
            text="Save"
            className="text-white rounded-lg min-w-[160px] xl:min-w-[222px] font-bold text-sm xl:text-[20px]"
          />
        </div>
      </form>
    </Form>
  );
};

export default AttendanceForm;
