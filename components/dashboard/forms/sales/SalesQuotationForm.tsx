"use client";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomButton from "@/components/formFields/CustomButton";
import TextInput from "@/components/formFields/TextInput";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { salesQuotationSchema } from "@/lib/validations/dashboard/sales/salesQuotationSchema";

interface SalesQuotationFormProps {
  onSubmit: (data: SalesQuotationFormValues) => Promise<void>;
  defaultValues?: SalesQuotationFormValues;
}

export interface SalesQuotationFormValues {
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

const SalesQuotationForm = ({ onSubmit, defaultValues }: SalesQuotationFormProps) => {
    const form = useForm<SalesQuotationFormValues>({
        resolver: zodResolver(salesQuotationSchema),
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
              label={t("SalesQuotation.date")}
              placeholder={t("SalesQuotation.date")}
            />
            <TextInput
              control={form.control}
              name="customer"
              label={t("SalesQuotation.customer")}
              placeholder={t("SalesQuotation.customer")}
            />
            <TextInput
              control={form.control}
              name="validity_period"
              label={t("SalesQuotation.validityPeriod")}
              placeholder={t("SalesQuotation.validityPeriod")}
            />
            <TextInput
              control={form.control}
              name="quotation_number"
              label={t("SalesQuotation.quotationNumber")}
              placeholder={t("SalesQuotation.quotationNumber")}
            />
          </div>
        </section>
        <div className="flex justify-end gap-2 mt-5">
          <Link href={`/dashboard/sales?tab=${t("salesQuotation")}`} passHref>
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

export default SalesQuotationForm;
