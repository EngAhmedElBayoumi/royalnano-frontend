"use client";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { stockAdjustmentSchema } from "@/lib/validations/dashboard/inventory/stockAdjustmentSchema";
import CustomButton from "@/components/formFields/CustomButton";
import TextInput from "@/components/formFields/TextInput";
import DateTimePicker from "@/components/formFields/DateTimePicker";
import Link from "next/link";

interface StockAdjustmentFormProps {
  onSubmit: (data: StockAdjustmentFormValues) => Promise<void>;
  defaultValues?: StockAdjustmentFormValues;
}

export interface StockAdjustmentFormValues {
  reason: string;
  item: string;
  quantity: number;
  type: string;
  date: Date;
}

const StockAdjustmentForm = ({
  onSubmit,
  defaultValues,
}: StockAdjustmentFormProps) => {
  const form = useForm({
    resolver: zodResolver(stockAdjustmentSchema),
    defaultValues: defaultValues || {
      reason: "",
      item: "",
      quantity: 0,
      type: "",
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
              name="reason"
              label="Reason"
              placeholder="Reason"
            />
            <TextInput
              control={form.control}
              name="item"
              label="Item"
              placeholder="Item"
            />
            <TextInput
              control={form.control}
              name="quantity"
              label="Quantity"
              placeholder="Quantity"
              type="number"
            />
            <TextInput
              control={form.control}
              name="type"
              label="Type"
              placeholder="Type"
            />
            <DateTimePicker
              control={form.control}
              name="date"
              label="Date"
              placeholder="Date"
            />
          </div>
        </section>
        <div className="flex justify-end gap-2 mt-5">
          <Link href="/dashboard/inventory" passHref>
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

export default StockAdjustmentForm;
