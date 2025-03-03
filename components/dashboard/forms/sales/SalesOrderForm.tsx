"use client";
import { Form } from "@/components/ui/form";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomButton from "@/components/formFields/CustomButton";
import TextInput from "@/components/formFields/TextInput";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { salesInvoiceSchema } from "@/lib/validations/dashboard/sales/salesInvoiceSchema";
import DatePicker from "@/components/formFields/DatePicker";
import { useGetMiniSalesCustomerQuery } from "@/redux/services/dashboard/sales/salesCustomerApi";
import CustomSelect from "@/components/formFields/CustomSelect";
import { useState } from "react";
import { useGetItemsQuery } from "@/redux/services/dashboard/inventory/itemsApi";
import { useGetBranchesQuery } from "@/redux/services/dashboard/inventory/branchesApi";

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
    item: number | null; // Existing item ID (null if custom item is used)
    custom_item_name: string; // Custom item name (empty if existing item is used)
    custom_price: string; // Custom item price (empty if existing item is used)
    discount: string;
    discount_percent: string;
  }[];
}

const SalesInvoiceForm = ({ onSubmit, defaultValues }: SalesInvoiceFormProps) => {
  const { data: customers } = useGetMiniSalesCustomerQuery({});
  const { data: branchesData } = useGetBranchesQuery({});
  const { data: itemsData, isLoading: isItemsLoading } = useGetItemsQuery({
    search: "",
    ordering: "id",
    page: 1,
    page_size: 10,
  });

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
      items: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  // State to track whether each item is "existing" or "custom"
  const [itemTypes, setItemTypes] = useState<("existing" | "custom")[]>([]);

  // Function to handle switching between "existing" and "custom" item types
  const handleItemTypeChange = (index: number, type: "existing" | "custom") => {
    setItemTypes((prev) => {
      const newItemTypes = [...prev];
      newItemTypes[index] = type;
      return newItemTypes;
    });

    // Reset fields when switching between existing and custom items
    if (type === "existing") {
      form.setValue(`items.${index}.custom_item_name`, ""); // Clear custom item name
      form.setValue(`items.${index}.custom_price`, ""); // Clear custom item price
    } else {
      form.setValue(`items.${index}.item`, null); // Clear existing item ID
    }
  };

  // Function to add a new item to the form
  const handleAddItem = () => {
    append({
      quantity: 1,
      item: null,
      custom_item_name: "",
      custom_price: "",
      discount: "",
      discount_percent: "",
    });
    setItemTypes((prev) => [...prev, "existing"]); // Default to "existing" type
  };

  const t = useTranslations("Sales");

  const customerOptions = customers
    ? customers.map((customer: { id: number; customer_name: string }) => ({
        value: customer.id.toString(),
        label: customer.customer_name,
      }))
    : [];

  const branchesOptions = branchesData?.results?.map((branch: { id: number; name: string }) => ({
    value: branch.id.toString(),
    label: branch.name,
  })) || [];

  const existingItems = itemsData?.results || [];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <section className="min-h-[60vh]">
          <div className="grid sm:grid-cols-2 gap-x-4 gap-y-2 xl:gap-y-5 lg:gap-x-10">
            {/* Main Form Fields */}
            <DatePicker
              control={form.control}
              name="invoice_date"
              label={t("SalesInvoice.invoiceDate")}
              placeholder={t("SalesInvoice.invoiceDate")}
            />
            <DatePicker
              control={form.control}
              name="due_date"
              label={t("SalesInvoice.dueDate")}
              placeholder={t("SalesInvoice.dueDate")}
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
            <CustomSelect
              valueType="number"
              control={form.control}
              name="customer"
              label={t("SalesInvoice.customer")}
              placeholder={t("SalesInvoice.customer")}
              options={customerOptions}
              onChange={(value) => {
                const customerId = parseInt(value, 10);
                form.setValue("customer", customerId);
              }}
            />
            <CustomSelect
              valueType="number"
              control={form.control}
              name="branch"
              label={t("SalesInvoice.branch")}
              placeholder={t("SalesInvoice.branch")}
              options={branchesOptions}
            />

            {/* Dynamic Items Section */}
            {fields.map((field, index) => {
              const itemType = itemTypes[index];

              return (
                <div key={field.id} className="col-span-2 border p-4 rounded-lg mb-4">
                  {/* Toggle Between Existing and Custom Items */}
                  <div className="flex gap-2 mb-2">
                    <button
                      type="button"
                      onClick={() => handleItemTypeChange(index, "existing")}
                      className={`p-2 rounded ${
                        itemType === "existing" ? "bg-primary text-white" : "bg-gray-200"
                      }`}
                    >
                      Add Existing Item
                    </button>
                    <button
                      type="button"
                      onClick={() => handleItemTypeChange(index, "custom")}
                      className={`p-2 rounded ${
                        itemType === "custom" ? "bg-primary text-white" : "bg-gray-200"
                      }`}
                    >
                      Add Custom Item
                    </button>
                  </div>

                  {/* Existing Item Fields */}
                  {itemType === "existing" && (
                    <CustomSelect
                      valueType="number"
                      control={form.control}
                      name={`items.${index}.item`}
                      label={t("SalesInvoice.selectItem")}
                      options={existingItems.map((item: { id: number; item_name: string }) => ({
                        value: item.id.toString(),
                        label: item.item_name,
                      }))}
                      placeholder={t("SalesInvoice.selectItem")}
                      onChange={(value) => {
                        if (value) {
                          const selectedItemId = parseInt(value, 10);
                          form.setValue(`items.${index}.item`, selectedItemId);
                        }
                      }}
                      isLoading={isItemsLoading}
                    />
                  )}

                  {/* Custom Item Fields */}
                  {itemType === "custom" && (
                    <>
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
                    </>
                  )}

                  {/* Common Fields */}
                  <TextInput
                    control={form.control}
                    name={`items.${index}.quantity`}
                    label={t("SalesInvoice.quantity")}
                    placeholder={t("SalesInvoice.quantity")}
                    type="number"
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

                  {/* Remove Item Button */}
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
              );
            })}

            {/* Add Item Button */}
            <button
              type="button"
              onClick={handleAddItem}
              className="bg-primary text-white p-2 rounded-lg mt-4"
            >
              Add Item
            </button>
          </div>
        </section>
        <div className="flex justify-end gap-2 mt-5">
          <Link href={`/dashboard/sales?tab=${t("invoice")}`} passHref>
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