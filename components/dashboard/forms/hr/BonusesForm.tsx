"use client";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bonusSchema } from "@/lib/validations/dashboard/hr/bonusSchema";
import CustomButton from "@/components/formFields/CustomButton";
import TextInput from "@/components/formFields/TextInput";
import DatePicker from "@/components/formFields/DatePicker";
import CustomSelect from "@/components/formFields/CustomSelect";
import Link from "next/link";

interface BonusesFormProps {
  onSubmit: (data: BonusesFormValues) => Promise<void>;
  defaultValues?: BonusesFormValues;
}

export interface BonusesFormValues {
  name: string;
  branch_name: string;
  rewards: string;
  start: Date;
  end: Date;
  date: Date;
}

const BonusesForm = ({ onSubmit, defaultValues }: BonusesFormProps) => {
  const form = useForm({
    resolver: zodResolver(bonusSchema),
    defaultValues: defaultValues || {
      name: "",
      branch_name: "",
      rewards: "",
      start: new Date(),
      end: new Date(),
      date: new Date(),
    },
  });

  const branchOptions = [
    { value: "Branch 1", label: "Branch 1" },
    { value: "Branch 2", label: "Branch 2" },
    { value: "Branch 3", label: "Branch 3" },
  ];

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
            <CustomSelect
              control={form.control}
              name="branch_name"
              label="Branch Name"
              placeholder="Select Branch"
              options={branchOptions}
            />
            <TextInput
              control={form.control}
              name="rewards"
              label="Rewards"
              placeholder="Rewards"
            />
            <DatePicker
              control={form.control}
              name="start"
              label="Start"
              placeholder="Select Start Date"
            />
            <DatePicker
              control={form.control}
              name="end"
              label="End"
              placeholder="Select End Date"
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
          <Link href="/dashboard/bonuses">
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

export default BonusesForm;
