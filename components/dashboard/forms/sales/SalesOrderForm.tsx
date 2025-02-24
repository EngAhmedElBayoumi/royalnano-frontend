"use client";
import { Form } from "@/components/ui/form";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomButton from "@/components/formFields/CustomButton";
import TextInput from "@/components/formFields/TextInput";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { salesOrderSchema } from "@/lib/validations/dashboard/sales/salesOrderSchema";
import DatePicker from "@/components/formFields/DatePicker";

import { useGetItemsQuery } from "@/redux/services/dashboard/itemsApi";
import { useGetMiniSalesCustomerQuery } from "@/redux/services/dashboard/sales/salesCustomerApi";
import CustomSelect from "@/components/formFields/CustomSelect";

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
    item: number | null; 
    custom_item_name: string;
    custom_price: string;
    discount: string;
    discount_percent: string;
  }[];
  status: string;
}

const SalesOrderForm = ({ onSubmit, defaultValues }: SalesOrderFormProps) => {
  const {data:customers}=useGetMiniSalesCustomerQuery({});
  console.log(customers)
  const form = useForm<SalesOrderFormValues>({
    resolver: zodResolver(salesOrderSchema),
    defaultValues: defaultValues || {
      order_date: "",
      customer: 1,
      branch: 1,
      sales_representative: "1",
      description: "random nnnnnn",
      items: [
        {
          quantity: 2,
          item: null, 
          custom_item_name: "name random",
          custom_price: "333",
          discount: "33",
          discount_percent: "33",
        },
      ],
      status: "pending",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const { data: itemsData, isLoading: isItemsLoading, error: itemsError } = useGetItemsQuery({
    search: "",
    ordering: "id",
    page: 1,
    page_size: 10,
  });

  const existingItems = itemsData?.results || [];

  const t = useTranslations("Sales");
  const customerOptions = customers
    ? customers.map((customer) => ({
        value: customer.id, 
        label: customer.customer_name,
      }))
    : [];
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
           <CustomSelect
              control={form.control}
              name="customer"
              label={t("SalesOrder.customer")}
              placeholder={t("SalesOrder.customer")}
              options={customerOptions}
              onChange={(value) => {
                console.log("select value")
                console.log(value)
                const customerId = parseInt(value, 10);
                form.setValue("customer", customerId); 
              }}
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
          {fields.map((field, index) => (
  <div key={field.id} className="col-span-2">
    {/* Dropdown for selecting existing items */}
    <CustomSelect
      control={form.control}
      name={`items.${index}.item`}
      label={t("SalesOrder.selectItem")}
      options={existingItems.map((item: { id: number; item_name: string }) => ({
        value: item.id,
        label: item.item_name,
      }))}
      placeholder={t("SalesOrder.selectItem")}
      onChange={(value) => {
        if (value) {
          const selectedItemId = parseInt(value, 10);
          form.setValue(`items.${index}.item`, selectedItemId);
          // Clear custom fields when an item is selected
          form.setValue(`items.${index}.custom_item_name`, "");
          form.setValue(`items.${index}.custom_price`, "");
        }
      }}
      isDisabled={!!form.watch(`items.${index}.custom_item_name`) || !!form.watch(`items.${index}.custom_price`)} // Disable if custom fields are filled
      isLoading={isItemsLoading}
    />

    {/* Custom Item Name */}
    <TextInput
      control={form.control}
      name={`items.${index}.custom_item_name`}
      label={t("SalesOrder.customItemName")}
      placeholder={t("SalesOrder.customItemName")}
      disabled={!!form.watch(`items.${index}.item`)} // Disable if an item is selected
      onChange={(e) => {
        // Clear the selected item if the user starts typing in the custom field
        if (e.target.value) {
          form.setValue(`items.${index}.item`, null);
        }
      }}
    />

    {/* Custom Price */}
    <TextInput
      control={form.control}
      name={`items.${index}.custom_price`}
      label={t("SalesOrder.customPrice")}
      placeholder={t("SalesOrder.customPrice")}
      disabled={!!form.watch(`items.${index}.item`)} // Disable if an item is selected
      onChange={(e) => {
        // Clear the selected item if the user starts typing in the custom field
        if (e.target.value) {
          form.setValue(`items.${index}.item`, null);
        }
      }}
    />

    {/* Quantity */}
    <TextInput
      control={form.control}
      name={`items.${index}.quantity`}
      label={t("SalesOrder.quantity")}
      placeholder={t("SalesOrder.quantity")}
      type="number"
    />

    {/* Discount */}
    <TextInput
      control={form.control}
      name={`items.${index}.discount`}
      label={t("SalesOrder.discount")}
      placeholder={t("SalesOrder.discount")}
    />

    {/* Discount Percent */}
    <TextInput
      control={form.control}
      name={`items.${index}.discount_percent`}
      label={t("SalesOrder.discountPercent")}
      placeholder={t("SalesOrder.discountPercent")}
    />

    {/* Remove Item Button */}
    <button
      type="button"
      onClick={() => remove(index)}
      className="text-red-500"
    >
      Remove Item
    </button>
  </div>
))}
         <button
  type="button"
  onClick={() =>
    append({
      quantity: 0,
      item: null, 
      custom_item_name: "", 
      custom_price: "",
      discount: "",
      discount_percent: "",
    })
  }
  className="col-span-2 bg-blue-500 text-white p-2 rounded"
>
  Add Item
</button>
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