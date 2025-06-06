"use client";
import { Form } from "@/components/ui/form";
import { useForm, useFieldArray } from "react-hook-form";
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
  total_amount: number;
  status: string;
  description: string;
  sales_order: number;
  customer: number;
  branch: number;
  items: {
    quantity: number;
    unit_price: string;
    discount: string;
    discount_percent: string;
    total: string;
    item: number;
    extra_fields: Record<string, string>;
  }[];
  consumed_items?: {
    inventory_item: number;
    quantity: number;
  }[];
}

const SalesInvoiceForm = ({
  onSubmit,
  defaultValues,
}: SalesInvoiceFormProps) => {
  const form = useForm<SalesInvoiceFormValues>({
    resolver: zodResolver(salesInvoiceSchema),
    defaultValues: defaultValues || {
      invoice_date: "",
      due_date: "",
      sales_representative: "2",
      total_amount: 0,
      status: "paid",
      description: "sample desc",
      sales_order: 1,
      customer: 2,
      branch: 41,
      items: [],
      consumed_items: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const {
    fields: consumedFields,
    append: appendConsumed,
    remove: removeConsumed,
  } = useFieldArray({
    control: form.control,
    name: "consumed_items",
  });

  const t = useTranslations("Sales");

  const handleAddItem = () => {
    append({
      quantity: 1,
      unit_price: "2",
      discount: "2",
      discount_percent: "0",
      total: "0",
      item: 0,
      extra_fields: {},
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(async (data) => {
          console.log("Submitting data:", data);
          try {
            await onSubmit(data);
          } catch (error: any) {
            alert(
              JSON.stringify(
                error?.response?.data || error?.message || "Unknown error"
              )
            );
          }
        })}
      >
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
          </div>

          <div className="mt-6">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="col-span-2 border p-4 rounded-lg mb-4"
              >
                <TextInput
                  control={form.control}
                  name={`items.${index}.item`}
                  label={t("SalesInvoice.item")}
                  placeholder={t("SalesInvoice.item")}
                  type="number"
                />
                <TextInput
                  control={form.control}
                  name={`items.${index}.quantity`}
                  label={t("SalesInvoice.quantity")}
                  placeholder={t("SalesInvoice.quantity")}
                  type="number"
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
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-red-500 mt-2"
                  >
                    Remove Item
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddItem}
              className="bg-primary text-white p-2 rounded-lg mt-4"
            >
              Add Item
            </button>
          </div>

          <div className="mt-10">
            <h3 className="text-lg font-semibold mb-4">
              {t("SalesInvoice.consumedItems")}
            </h3>
            {consumedFields.map((field, index) => (
              <div
                key={field.id}
                className="col-span-2 border p-4 rounded-lg mb-4"
              >
                <TextInput
                  type="number"
                  control={form.control}
                  name={`consumed_items.${index}.inventory_item`}
                  label={t("SalesInvoice.inventoryItem")}
                  placeholder={t("SalesInvoice.inventoryItem")}
                />
                <TextInput
                  control={form.control}
                  name={`consumed_items.${index}.quantity`}
                  label={t("SalesInvoice.quantity")}
                  placeholder={t("SalesInvoice.quantity")}
                  type="number"
                />
                {consumedFields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeConsumed(index)}
                    className="text-red-500 mt-2"
                  >
                    Remove Consumed Item
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                appendConsumed({
                  inventory_item: 2,
                  quantity: 1,
                })
              }
              className="bg-primary text-white p-2 rounded-lg mt-4"
            >
              {t("SalesInvoice.addConsumedItem")}
            </button>
          </div>
        </section>

        <div className="flex justify-end gap-2 mt-5 flex-col-reverse xs:flex-row">
          <Link href="/dashboard/sales?tab=sales-invoice" passHref>
            <CustomButton text={t("cancel")} variant="secondary" />
          </Link>
          <CustomButton text={t("save")} type="submit" />
        </div>
      </form>
    </Form>
  );
};

export default SalesInvoiceForm;
