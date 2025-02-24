"use client";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomButton from "@/components/formFields/CustomButton";
import TextInput from "@/components/formFields/TextInput";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { salesOrderSchema } from "@/lib/validations/dashboard/sales/salesOrderSchema";
import DatePicker from "@/components/formFields/DatePicker";

interface SalesOrderFormProps {
  onSubmit: (data: SalesOrderFormValues) => Promise<void>;
  defaultValues?: SalesOrderFormValues;
}

export interface SalesOrderFormValues {
  order_date: string;
  customer: number;
  branch: number;
  sales_representative: string;
  description: string;
  items: {
    quantity: number;
    item: number;
    custom_item_name: string;
    custom_price: string;
    discount: string;
    discount_percent: string;
  }[];
  status: string;
}

const SalesOrderForm = ({ onSubmit, defaultValues }: SalesOrderFormProps) => {
  const form = useForm<SalesOrderFormValues>({
    resolver: zodResolver(salesOrderSchema),
    defaultValues: defaultValues || {
      order_date: "",
      customer: 0,
      branch: 0,
      sales_representative: "",
      description: "",
      items: [
        {
          quantity: 0,
          item: 0,
          custom_item_name: "",
          custom_price: "",
          discount: "",
          discount_percent: "",
        },
      ],
      status: "",
    },
  });

  const t = useTranslations("Sales");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <section className="min-h-[60vh]">
          <div className="grid sm:grid-cols-2 gap-x-4 gap-y-2 xl:gap-y-5 lg:gap-x-10">
          <DatePicker
              control={form.control}
             name="order_date"
             label={t("SalesOrder.orderDate")}
             placeholder={t("SalesOrder.orderDate")}
            />
            
            <TextInput
              control={form.control}
              name="customer"
              label={t("SalesOrder.customer")}
              placeholder={t("SalesOrder.customer")}
              type="number"
            />
            <TextInput
              control={form.control}
              name="branch"
              label={t("SalesOrder.branch")}
              placeholder={t("SalesOrder.branch")}
              type="number"
            />
            <TextInput
              control={form.control}
              name="sales_representative"
              label={t("SalesOrder.salesRepresentative")}
              placeholder={t("SalesOrder.salesRepresentative")}
            />
            <TextInput
              control={form.control}
              name="description"
              label={t("SalesOrder.description")}
              placeholder={t("SalesOrder.description")}
            />
            {form.watch("items").map((item, index) => (
              <div key={index} className="col-span-2">
                <TextInput
                  control={form.control}
                  name={`items.${index}.quantity`}
                  label={t("SalesOrder.quantity")}
                  placeholder={t("SalesOrder.quantity")}
                  type="number"
                />
                <TextInput
                  control={form.control}
                  name={`items.${index}.item`}
                  label={t("SalesOrder.item")}
                  placeholder={t("SalesOrder.item")}
                  type="number"
                />
                <TextInput
                  control={form.control}
                  name={`items.${index}.custom_item_name`}
                  label={t("SalesOrder.customItemName")}
                  placeholder={t("SalesOrder.customItemName")}
                />
                <TextInput
                  control={form.control}
                  name={`items.${index}.custom_price`}
                  label={t("SalesOrder.customPrice")}
                  placeholder={t("SalesOrder.customPrice")}
                />
                <TextInput
                  control={form.control}
                  name={`items.${index}.discount`}
                  label={t("SalesOrder.discount")}
                  placeholder={t("SalesOrder.discount")}
                />
                <TextInput
                  control={form.control}
                  name={`items.${index}.discount_percent`}
                  label={t("SalesOrder.discountPercent")}
                  placeholder={t("SalesOrder.discountPercent")}
                />
              </div>
            ))}
          </div>
        </section>
        <div className="flex justify-end gap-2 mt-5">
          <Link href={`/dashboard/sales?tab=${t("order")}`} passHref>
            <CustomButton
              text={t("cancel")}
              className="text-white rounded-lg bg-secondary min-w-[160px] xl:min-w-[222px] font-bold text-sm xl:text-[20px]"
            />
          </Link>
          <CustomButton
            text={t("save")}
            type="submit"
            className="text-white rounded-lg min-w-[160px] xl:min-w-[222px] font-bold text-sm xl:text-[20px]"
          />
        </div>
      </form>
    </Form>
  );
};

export default SalesOrderForm;