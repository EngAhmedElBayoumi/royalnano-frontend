/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Form } from "@/components/ui/form";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomButton from "@/components/formFields/CustomButton";
import TextInput from "@/components/formFields/TextInput";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { salesInvoiceSchema } from "@/lib/validations/dashboard/sales/salesInvoiceSchema";
import CustomSelect from "@/components/formFields/CustomSelect";
import { useGetConsumedItemsQuery } from "@/redux/services/dashboard/sales/salesConsumedItemsApi";

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
  quotation: number; // Changed from sales_order
  customer: number;
  branch: number;
  items: {
    quantity: number;
    unit_price: string;
    discount: string;
    discount_percent: string;
    total: string;
    item: string; // Product ID
    extra_fields: Record<string, string>;
  }[];
  consumed_items?: {
    inventory_item: number;
    quantity: number;
  }[];
  // consumed_items?: [];
  extra_fields: Record<string, string>; // Added root extra_fields
  invoice_number: string; // Added new field
  created_at: string; // Added new field
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
      sales_representative: "John Doe",
      total_amount: 0,
      status: "paid",
      description: "Invoice for June order - electronics",
      quotation: 1,
      customer: 1,
      branch: 41,
      items: [],
      consumed_items: [],
      extra_fields: {},
      invoice_number: "INV-2025-0001",
      created_at: "2025-06-06T10:30:00Z",
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
      unit_price: "0.00",
      discount: "0.00",
      discount_percent: "0",
      total: "0.00",
      item: "nerm",
      extra_fields: {},
    });
  };

  const { data: consumedItems } = useGetConsumedItemsQuery({
    search: "",
    ordering: "id",
    page: 1,
    page_size: 10,
  });

  // Map consumed items to select options
  const consumedItemOptions = (consumedItems?.results || []).map(
    (item: { id: { toString: () => any }; name: any }) => ({
      value: item.id.toString(), // Convert to string if your component expects string values
      label: item.name || `Item ${item.id}`, // Use actual field from your API response
    })
  );
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
              name="quotation"
              label={t("SalesInvoice.quotation")}
              placeholder={t("SalesInvoice.quotation")}
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
            <TextInput
              control={form.control}
              name="invoice_number"
              label={t("SalesInvoice.invoiceNumber")}
              placeholder={t("SalesInvoice.invoiceNumber")}
            />
            <TextInput
              control={form.control}
              name="created_at"
              label={t("SalesInvoice.createdAt")}
              placeholder={t("SalesInvoice.createdAt")}
              type="datetime-local"
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
                  label={t("SalesInvoice.productId")}
                  placeholder={t("SalesInvoice.productId")}
                  type="text"
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
                    {t("SalesInvoice.removeItem")}
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddItem}
              className="bg-primary text-white p-2 rounded-lg mt-4"
            >
              {t("SalesInvoice.addItem")}
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
                <CustomSelect
                  control={form.control}
                  name={`consumed_items.${index}.inventory_item`}
                  label={t("SalesInvoice.consumedItem")}
                  placeholder={t("SalesInvoice.selectConsumedItem")}
                  options={consumedItemOptions}
                  // isLoading={isLoading}
                />
                <TextInput
                  control={form.control}
                  name={`consumed_items.${index}.quantity`}
                  label={t("SalesInvoice.quantity")}
                  placeholder={t("SalesInvoice.quantity")}
                  type="number"
                  // min={1}
                />

                {consumedFields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeConsumed(index)}
                    className="text-red-500 mt-2"
                  >
                    {t("SalesInvoice.removeConsumedItem")}
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                appendConsumed({
                  inventory_item: 0,
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
