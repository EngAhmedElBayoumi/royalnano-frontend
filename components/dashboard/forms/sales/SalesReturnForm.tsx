"use client";
import { Form } from "@/components/ui/form";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomButton from "@/components/formFields/CustomButton";
import TextInput from "@/components/formFields/TextInput";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

import DatePicker from "@/components/formFields/DatePicker";
// import { useGetMiniSalesCustomerQuery } from "@/redux/services/dashboard/sales/salesCustomerApi";
import CustomSelect from "@/components/formFields/CustomSelect";
import { useState } from "react";
import { useGetItemsQuery } from "@/redux/services/dashboard/inventory/itemsApi";
import { useGetBranchesQuery } from "@/redux/services/dashboard/inventory/branchesApi";
import { salesReturnSchema } from "@/lib/validations/dashboard/sales/salesReturnSchema";

interface SalesReturnFormProps {
  onSubmit: (data: SalesReturnFormValues) => Promise<void>;
  defaultValues?: SalesReturnFormValues;
}

export interface SalesReturnFormValues {
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

const SalesReturnForm = ({ onSubmit, defaultValues }: SalesReturnFormProps) => {
  //   const { data: customers } = useGetMiniSalesCustomerQuery({});
  const { data: branchesData } = useGetBranchesQuery({});
  // console.log(branchesData.results)
  const form = useForm<SalesReturnFormValues>({
    resolver: zodResolver(salesReturnSchema),
    defaultValues: defaultValues || {
      order_date: "",
      customer: 1,
      branch: 1,
      sales_representative: "1",
      description: "random nnnnnn",
      items: [],
      status: "pending",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const { data: itemsData } = useGetItemsQuery({
    search: "",
    ordering: "id",
    page: 1,
    page_size: 10,
  });

  const existingItems = itemsData?.results || [];

  const t = useTranslations("Sales");
  //   const customerOptions = customers
  //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //     ? customers.map((customer: { id: { toString: () => any; }; customer_name: any; }) => ({
  //         value: customer.id.toString(),
  //         label: customer.customer_name,
  //       }))
  //     : [];

  const [itemTypes, setItemTypes] = useState<("existing" | "custom")[]>([]);

  const handleItemTypeChange = (index: number, type: "existing" | "custom") => {
    setItemTypes((prev) => {
      const newItemTypes = [...prev];
      newItemTypes[index] = type;
      return newItemTypes;
    });

    if (type === "existing") {
      form.setValue(`items.${index}.custom_item_name`, "");
      form.setValue(`items.${index}.custom_price`, "");
    } else {
      form.setValue(`items.${index}.item`, null);
    }
  };

  const handleAddItem = () => {
    append({
      quantity: 1,
      item: null,
      custom_item_name: "",
      custom_price: "",
      discount: "",
      discount_percent: "",
    });
    setItemTypes((prev) => [...prev, "existing"]);
  };
  const branchesOptions =
    branchesData?.results?.map((branch: { id: number; name: string }) => ({
      value: branch.id.toString(),
      label: branch.name,
    })) || [];
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <section className="min-h-[60vh]">
          <div className="grid sm:grid-cols-2 gap-x-4 gap-y-2 xl:gap-y-5 lg:gap-x-10">
            <DatePicker
              control={form.control}
              name="order_date"
              label={t("SalesReturn.orderDate")}
              placeholder={t("SalesReturn.orderDate")}
            />
            {/* <CustomSelect
            valueType="number"
              control={form.control}
              name="customer"
              label={t("SalesReturn.customer")}
              placeholder={t("SalesReturn.customer")}
              options={customerOptions}
              onChange={(value) => {
                const customerId = parseInt(value, 10);
                form.setValue("customer", customerId);
              }}
            /> */}
            <CustomSelect
              valueType="number"
              control={form.control}
              name="branch"
              label="Choose Branch"
              placeholder="Choose Branch"
              options={branchesOptions}
            />
            <TextInput
              control={form.control}
              name="sales_representative"
              label={t("SalesReturn.salesRepresentative")}
              placeholder={t("SalesReturn.salesRepresentative")}
            />
            <TextInput
              control={form.control}
              name="description"
              label={t("SalesReturn.description")}
              placeholder={t("SalesReturn.description")}
            />
            {fields.map((field, index) => {
              const itemType = itemTypes[index];

              return (
                <div
                  key={field.id}
                  className="col-span-2 border p-4 rounded-lg mb-4"
                >
                  <div className="flex gap-2 mb-2">
                    <button
                      type="button"
                      onClick={() => handleItemTypeChange(index, "existing")}
                      className={`p-2 rounded ${
                        itemType === "existing"
                          ? "bg-primary text-white"
                          : "bg-gray-200"
                      }`}
                    >
                      Add Existing Item
                    </button>
                    <button
                      type="button"
                      onClick={() => handleItemTypeChange(index, "custom")}
                      className={`p-2 rounded ${
                        itemType === "custom"
                          ? "bg-primary text-white"
                          : "bg-gray-200"
                      }`}
                    >
                      Add Custom Item
                    </button>
                  </div>

                  {itemType === "existing" && (
                    <CustomSelect
                      valueType="number"
                      control={form.control}
                      name={`items.${index}.item`}
                      label={t("SalesReturn.selectItem")}
                      options={existingItems.map(
                        (item: { id: number; item_name: string }) => ({
                          value: item.id.toString(),
                          label: item.item_name,
                        })
                      )}
                      placeholder={t("SalesReturn.selectItem")}
                      onChange={(value) => {
                        if (value) {
                          const selectedItemId = parseInt(value.toString(), 10);
                          form.setValue(`items.${index}.item`, selectedItemId);
                        }
                      }}
                      // isLoading={isItemsLoading}
                    />
                  )}

                  {itemType === "custom" && (
                    <>
                      <TextInput
                        control={form.control}
                        name={`items.${index}.custom_item_name`}
                        label={t("SalesReturn.customItemName")}
                        placeholder={t("SalesReturn.customItemName")}
                      />
                      <TextInput
                        control={form.control}
                        name={`items.${index}.custom_price`}
                        label={t("SalesReturn.customPrice")}
                        placeholder={t("SalesReturn.customPrice")}
                      />
                    </>
                  )}

                  <TextInput
                    control={form.control}
                    name={`items.${index}.quantity`}
                    label={t("SalesReturn.quantity")}
                    placeholder={t("SalesReturn.quantity")}
                    type="number"
                  />

                  <TextInput
                    control={form.control}
                    name={`items.${index}.discount`}
                    label={t("SalesReturn.discount")}
                    placeholder={t("SalesReturn.discount")}
                  />

                  <TextInput
                    control={form.control}
                    name={`items.${index}.discount_percent`}
                    label={t("SalesReturn.discountPercent")}
                    placeholder={t("SalesReturn.discountPercent")}
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
              );
            })}
          </div>
          <button
            type="button"
            onClick={handleAddItem}
            className="bg-primary text-white p-2 rounded-lg mt-4"
          >
            Add Item
          </button>
        </section>
        <div className="flex justify-end gap-2 mt-5 flex-col-reverse xs:flex-row">
          <Link href={`/dashboard/sales?tab=${t("order")}`} passHref>
            <CustomButton text={t("cancel")} variant="secondary" />
          </Link>
          <CustomButton text={t("save")} type="submit" />
        </div>
      </form>
    </Form>
  );
};

export default SalesReturnForm;
