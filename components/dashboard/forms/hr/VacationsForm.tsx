"use client";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { vacationSchema } from "@/lib/validations/dashboard/hr/vacationSchema";
import CustomButton from "@/components/formFields/CustomButton";
import TextInput from "@/components/formFields/TextInput";
import DatePicker from "@/components/formFields/DatePicker";
import Link from "next/link";

interface VacationsFormProps {
  onSubmit: (data: VacationsFormValues) => Promise<void>;
  defaultValues?: VacationsFormValues;
}

export interface VacationsFormValues {
  name: string;
  job_title: string;
  vacation_period: string;
  from: Date;
  to: Date;
  date: Date;
}

const VacationsForm = ({ onSubmit, defaultValues }: VacationsFormProps) => {
  const form = useForm({
    resolver: zodResolver(vacationSchema),
    defaultValues: defaultValues || {
      name: "",
      job_title: "",
      vacation_period: "",
      from: new Date(),
      to: new Date(new Date().setDate(new Date().getDate() + 1)),
      date: new Date(),
    },
  });

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
              name="job_title"
              label="Job Title"
              placeholder="Job Title"
            />
            <TextInput
              control={form.control}
              name="vacation_period"
              label="Vacation Period"
              placeholder="Vacation Period"
            />
            <DatePicker
              control={form.control}
              name="date"
              label="Date"
              placeholder="Select Date"
            />
            <DatePicker
              control={form.control}
              name="from"
              label="From"
              placeholder="Select From Date"
              disabledEndDate={form.watch("to")}
            />
            <DatePicker
              control={form.control}
              name="to"
              label="To"
              placeholder="Select To Date"
              disabledStartDate={form.watch("from")}
              disabledEndDate={
                new Date(
                  form.watch("from").getTime() + 30 * 24 * 60 * 60 * 1000
                )
              } // 30 days after 'from'
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

export default VacationsForm;
