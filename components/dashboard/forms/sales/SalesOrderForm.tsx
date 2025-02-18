"use client";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomButton from "@/components/formFields/CustomButton";
import TextInput from "@/components/formFields/TextInput";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { salesOrderSchema } from "@/lib/validations/dashboard/sales/salesOrderSchema";

interface SalesOrderFormProps {
  
  onSubmit: (data: SalesOrderFormValues) => Promise<void>;
  defaultValues?: SalesOrderFormValues;
}

export interface SalesOrderFormValues {
  date: string;
  customer: string;
  validity_period: string;
  quotation_number: string;
  items: {
    item_name: string;
    quantity: number;
    unit_price: number;
    discount: string;
    discount_percent: string;
    tax_rate: string;
  }[];
}

const SalesOrderForm = ({ onSubmit, defaultValues }: SalesOrderFormProps) => {
    const form = useForm<SalesOrderFormValues>({
        resolver: zodResolver(salesOrderSchema),
        defaultValues: defaultValues || {
          date: "",
          customer: "",
          validity_period: "",
          quotation_number: "",
          items: [{ item_name: "", quantity: 0, unit_price: 0, discount: "", discount_percent: "", tax_rate: "" }],
        },
      });

  const t = useTranslations("Sales");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <section className="min-h-[60vh]">
          <div className="grid sm:grid-cols-2 gap-x-4 gap-y-2 xl:gap-y-5 lg:gap-x-10">
            <TextInput
              control={form.control}
              name="date"
              label={t("SalesOrder.date")}
              placeholder={t("SalesOrder.date")}
            />
            <TextInput
              control={form.control}
              name="customer"
              label={t("SalesOrder.customer")}
              placeholder={t("SalesOrder.customer")}
            />
            <TextInput
              control={form.control}
              name="validity_period"
              label={t("SalesOrder.validityPeriod")}
              placeholder={t("SalesOrder.validityPeriod")}
            />
            <TextInput
              control={form.control}
              name="quotation_number"
              label={t("SalesOrder.quotationNumber")}
              placeholder={t("SalesOrder.quotationNumber")}
            />
          </div>
        </section>
        <div className="flex justify-end gap-2 mt-5">
          <Link href={`/dashboard/sales?tab=${t("salesOrder")}`} passHref>
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
