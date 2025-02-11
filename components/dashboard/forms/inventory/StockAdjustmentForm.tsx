"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { stockAdjustmentSchema } from "@/lib/validations/dashboard/inventory/stockAdjustmentSchema";
import { useGetItemsQuery } from "@/redux/services/dashboard/itemsApi";
import { Form } from "@/components/ui/form";
import CustomButton from "@/components/formFields/CustomButton";
import TextInput from "@/components/formFields/TextInput";
import CustomSelect from "@/components/formFields/CustomSelect";
import CustomTextArea from "@/components/formFields/TextArea";
import DatePicker from "@/components/formFields/DatePicker";

interface StockAdjustmentFormProps {
  onSubmit: (data: StockAdjustmentFormValues) => Promise<void>;
  defaultValues?: StockAdjustmentFormValues;
  isView?: boolean;
}

export interface StockAdjustmentFormValues {
  item: string;
  quantity_adjusted: number;
  reason: string;
  adjustment_type: string;
  adjustment_date: Date;
  description: string;
}

const StockAdjustmentForm = ({
  onSubmit,
  defaultValues,
  isView,
}: StockAdjustmentFormProps) => {
  const form = useForm({
    resolver: zodResolver(stockAdjustmentSchema),
    defaultValues: defaultValues || {
      item: "",
      reason: "",
      quantity_adjusted: 0,
      adjustment_type: "",
      adjustment_date: new Date(),
      description: "",
    },
  });
  const { data: items } = useGetItemsQuery({});

  const itemsOptions =
    items?.results?.map((item: { id: number; item_name: string }) => ({
      value: String(item.id),
      label: item.item_name,
    })) || [];

  const typeOptions = [
    { value: "Increase", label: "Increase" },
    { value: "Decrease", label: "Decrease" },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <section className="min-h-[60vh]">
          <div className="grid sm:grid-cols-2 gap-x-4 gap-y-2 xl:gap-y-5 lg:gap-x-10">
            <CustomSelect
              control={form.control}
              name="item"
              label="Item"
              placeholder="Item"
              options={itemsOptions}
              readonly={isView}
            />
            <TextInput
              control={form.control}
              name="reason"
              label="Reason"
              placeholder="Reason"
              readonly={isView}
            />

            <TextInput
              control={form.control}
              name="quantity_adjusted"
              label="quantity_adjusted"
              placeholder="quantity_adjusted"
              type="number"
              readonly={isView}
            />
            <CustomSelect
              control={form.control}
              name="adjustment_type"
              label="Adjustment Type"
              placeholder="Adjustment Type"
              options={typeOptions}
              readonly={isView}
            />

            <DatePicker
              control={form.control}
              name="adjustment_date"
              label="Date"
              placeholder="Date"
              readonly={isView}
            />
          </div>
          <CustomTextArea
            control={form.control}
            name="description"
            label="Description"
            placeholder="Description"
            className="mt-2 xl:mt-5"
            readonly={isView}
          />
        </section>
        {!isView && (
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
        )}
      </form>
    </Form>
  );
};

export default StockAdjustmentForm;
