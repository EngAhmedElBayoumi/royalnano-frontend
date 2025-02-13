"use client";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { salarySchema } from "@/lib/validations/dashboard/hr/salarySchema";
import CustomButton from "@/components/formFields/CustomButton";
import TextInput from "@/components/formFields/TextInput";
import DatePicker from "@/components/formFields/DatePicker";
import {Link} from '@/i18n/routing';

interface SalaryFormProps {
  onSubmit: (data: SalaryFormValues) => Promise<void>;
  defaultValues?: SalaryFormValues;
}

export interface SalaryFormValues {
  name: string;
  job_title: string;
  salary: string;
  date: Date;
}

const SalaryForm = ({ onSubmit, defaultValues }: SalaryFormProps) => {
  const form = useForm({
    resolver: zodResolver(salarySchema),
    defaultValues: defaultValues || {
      name: "",
      job_title: "",
      salary: "",
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
              name="salary"
              label="Salary"
              placeholder="Salary"
            />
            <DatePicker
              control={form.control}
              name="date"
              label="Date"
              placeholder="Select Date"
            />
          </div>
        </section>
        <div className="flex justify-end gap-2 mt-5">
          <Link href="/dashboard/hr" passHref>
            <CustomButton
              text="Cancel"
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

export default SalaryForm;
