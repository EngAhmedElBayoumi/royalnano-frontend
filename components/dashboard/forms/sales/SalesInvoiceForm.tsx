"use client";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomButton from "@/components/formFields/CustomButton";
import TextInput from "@/components/formFields/TextInput";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { salesInvoiceSchema } from "@/lib/validations/dashboard/sales/salesInvoiceSchema";

interface SalesInvoiceFormProps {
  onSubmit: (data: SalesInvoiceFormValues) => Promise<void>;
  defaultValues?: SalesInvoiceFormValues;
}

export interface SalesInvoiceFormValues {
  invoice_date: string;
  due_date: string;
  sales_representative: string;
  total_amount: string;
  status: string;
  description: string;
  sales_order: number;
  customer: number;
  branch: number;
  items: {
    quantity: number;
    sales_invoice: number;
    custom_item_name: string;
    custom_price: string;
    unit_price: string;
    discount: string;
    discount_percent: string;
    total: string;
    item: number;
  }[];
}

const SalesInvoiceForm = ({ onSubmit, defaultValues }: SalesInvoiceFormProps) => {
  const form = useForm<SalesInvoiceFormValues>({
    resolver: zodResolver(salesInvoiceSchema),
    defaultValues: defaultValues || {
      invoice_date: "",
      due_date: "",
      sales_representative: "",
      total_amount: "",
      status: "",
      description: "",
      sales_order: 0,
      customer: 0,
      branch: 0,
      items: [
        {
          quantity: 0,
          sales_invoice: 0,
          custom_item_name: "",
          custom_price: "",
          unit_price: "",
          discount: "",
          discount_percent: "",
          total: "",
          item: 0,
        },
      ],
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
              name="invoice_date"
              label={t("SalesInvoice.invoiceDate")}
              placeholder={t("SalesInvoice.invoiceDate")}
              type="date"
            />
            <TextInput
              control={form.control}
              name="due_date"
              label={t("SalesInvoice.dueDate")}
              placeholder={t("SalesInvoice.dueDate")}
              type="date"
            />
            <TextInput
              control={form.control}
              name="sales_representative"
              label={t("SalesInvoice.salesRepresentative")}
              placeholder={t("SalesInvoice.salesRepresentative")}
            />
            <TextInput
              control={form.control}
              name="total_amount"
              label={t("SalesInvoice.totalAmount")}
              placeholder={t("SalesInvoice.totalAmount")}
              type="number"
            />
            <TextInput
              control={form.control}
              name="status"
              label={t("SalesInvoice.status")}
              placeholder={t("SalesInvoice.status")}
            />
            <TextInput
              control={form.control}
              name="description"
              label={t("SalesInvoice.description")}
              placeholder={t("SalesInvoice.description")}
            />
            <TextInput
              control={form.control}
              name="sales_order"
              label={t("SalesInvoice.salesOrder")}
              placeholder={t("SalesInvoice.salesOrder")}
              type="number"
            />
            <TextInput
              control={form.control}
              name="customer"
              label={t("SalesInvoice.customer")}
              placeholder={t("SalesInvoice.customer")}
              type="number"
            />
            <TextInput
              control={form.control}
              name="branch"
              label={t("SalesInvoice.branch")}
              placeholder={t("SalesInvoice.branch")}
              type="number"
            />

            {/* Dynamic Items Section */}
            {form.watch("items").map((item, index) => (
              <div key={index} className="col-span-2 border p-4 rounded-lg">
                <TextInput
                  control={form.control}
                  name={`items.${index}.quantity`}
                  label={t("SalesInvoice.quantity")}
                  placeholder={t("SalesInvoice.quantity")}
                  type="number"
                />
                <TextInput
                  control={form.control}
                  name={`items.${index}.sales_invoice`}
                  label={t("SalesInvoice.salesInvoice")}
                  placeholder={t("SalesInvoice.salesInvoice")}
                  type="number"
                />
                <TextInput
                  control={form.control}
                  name={`items.${index}.custom_item_name`}
                  label={t("SalesInvoice.customItemName")}
                  placeholder={t("SalesInvoice.customItemName")}
                />
                <TextInput
                  control={form.control}
                  name={`items.${index}.custom_price`}
                  label={t("SalesInvoice.customPrice")}
                  placeholder={t("SalesInvoice.customPrice")}
                />
                <TextInput
                  control={form.control}
                  name={`items.${index}.unit_price`}
                  label={t("SalesInvoice.unitPrice")}
                  placeholder={t("SalesInvoice.unitPrice")}
                />
                <TextInput
                  control={form.control}
                  name={`items.${index}.discount`}
                  label={t("SalesInvoice.discount")}
                  placeholder={t("SalesInvoice.discount")}
                />
                <TextInput
                  control={form.control}
                  name={`items.${index}.discount_percent`}
                  label={t("SalesInvoice.discountPercent")}
                  placeholder={t("SalesInvoice.discountPercent")}
                />
                <TextInput
                  control={form.control}
                  name={`items.${index}.total`}
                  label={t("SalesInvoice.total")}
                  placeholder={t("SalesInvoice.total")}
                />
                <TextInput
                  control={form.control}
                  name={`items.${index}.item`}
                  label={t("SalesInvoice.item")}
                  placeholder={t("SalesInvoice.item")}
                  type="number"
                />
              </div>
            ))}
          </div>
        </section>
        <div className="flex justify-end gap-2 mt-5">
          <Link href={`/dashboard/sales?tab=${t("salesInvoice")}`} passHref>
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

export default SalesInvoiceForm;