"use client";
import { Link } from "@/i18n/routing";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { stockAdjustmentSchema } from "@/lib/validations/dashboard/inventory/stockAdjustmentSchema";
import { useGetItemsQuery } from "@/redux/services/dashboard/inventory/itemsApi";
import { Form } from "@/components/ui/form";
import CustomButton from "@/components/formFields/CustomButton";
import TextInput from "@/components/formFields/TextInput";
import CustomSelect from "@/components/formFields/CustomSelect";
import CustomTextArea from "@/components/formFields/TextArea";
import DatePicker from "@/components/formFields/DatePicker";
import { useTranslations } from "next-intl";

interface StockAdjustmentFormProps {
  onSubmit: (data: StockAdjustmentFormValues) => Promise<void>;
  defaultValues?: StockAdjustmentFormValues;
  isView?: boolean;
  isLoading?: boolean;
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
  isLoading,
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
  const t = useTranslations();

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
              label={t("Inventory.InventoryStockAdjustment.item")}
              placeholder={t("Inventory.InventoryStockAdjustment.item")}
              options={itemsOptions}
              readonly={isView}
            />
            <TextInput
              control={form.control}
              name="reason"
              label={t("Inventory.InventoryStockAdjustment.reason")}
              placeholder={t("Inventory.InventoryStockAdjustment.reason")}
              readonly={isView}
            />
            <TextInput
              control={form.control}
              name="quantity_adjusted"
              label={t("Inventory.InventoryStockAdjustment.quantityAdjusted")}
              placeholder={t(
                "Inventory.InventoryStockAdjustment.quantityAdjusted"
              )}
              type="number"
              readonly={isView}
            />
            <CustomSelect
              control={form.control}
              name="adjustment_type"
              label={t("Inventory.InventoryStockAdjustment.adjustmentType")}
              placeholder={t(
                "Inventory.InventoryStockAdjustment.adjustmentType"
              )}
              options={typeOptions}
              readonly={isView}
            />
            <DatePicker
              control={form.control}
              name="adjustment_date"
              label={t("Inventory.InventoryStockAdjustment.date")}
              placeholder={t("Inventory.InventoryStockAdjustment.date")}
              readonly={isView}
            />
          </div>
          <CustomTextArea
            control={form.control}
            name="description"
            label={t("Inventory.InventoryStockAdjustment.description")}
            placeholder={t("Inventory.InventoryStockAdjustment.description")}
            className="mt-2 xl:mt-5"
            readonly={isView}
          />
        </section>
        {!isView && (
          <div className="flex justify-end gap-2 mt-5">
            <Link
              href={`/dashboard/inventory?tab=${t(
                "Inventory.stockAdjustment"
              )}`}
              passHref
            >
              <CustomButton text={t("cancel")} variant="secondary" />
            </Link>
            <CustomButton
              text={isLoading ? t("saving") : t("save")}
              isDisabled={isLoading}
            />
          </div>
        )}
      </form>
    </Form>
  );
};

export default StockAdjustmentForm;
