"use client";
import { Form } from "@/components/ui/form";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomButton from "@/components/formFields/CustomButton";
import TextInput from "@/components/formFields/TextInput";
import { Link, useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import DatePicker from "@/components/formFields/DatePicker";
import { useGetMiniSalesCustomerQuery } from "@/redux/services/dashboard/sales/salesCustomerApi";
import CustomSelect from "@/components/formFields/CustomSelect";
import { useState, useEffect } from "react";
import { useGetBranchesQuery } from "@/redux/services/dashboard/inventory/branchesApi";
import { useGetItemsQuery } from "@/redux/services/dashboard/inventory/itemsApi";
import {
  useGetSalesOrderByIdQuery,
  useUpdateSalesOrderMutation,
} from "@/redux/services/dashboard/sales/salesOrderApi";
import { EditSalesOrderSchema } from "@/lib/validations/dashboard/sales/editSalesOrderSchema";

interface EditSalesOrderFormProps {
  salesOrderId: number;
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

const EditSalesOrderForm = ({
  salesOrderId,
  defaultValues,
}: EditSalesOrderFormProps) => {
  const { data: customers } = useGetMiniSalesCustomerQuery({});
  const { data: branchesData } = useGetBranchesQuery({});
  const { data: SalesOrderData } = useGetSalesOrderByIdQuery(salesOrderId);
  const { data: itemsData } = useGetItemsQuery({
    search: "",
    ordering: "id",
    page: 1,
    page_size: 10,
  });
  const [updateSalesOrder] = useUpdateSalesOrderMutation();
  const router = useRouter();

  const form = useForm<SalesOrderFormValues>({
    resolver: zodResolver(EditSalesOrderSchema),
    defaultValues: defaultValues || {
      order_date: SalesOrderData?.order_date,
      customer: SalesOrderData?.customer?.id,
      branch: SalesOrderData?.branch?.id,
      sales_representative: SalesOrderData?.sales_representative,
      description: SalesOrderData?.description,
      items: SalesOrderData?.items,
      status: SalesOrderData?.status,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const [itemTypes, setItemTypes] = useState<("existing" | "custom")[]>(
    defaultValues?.items.map((item) =>
      item.item !== null ? "existing" : "custom"
    ) || []
  );

  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
      setItemTypes(
        defaultValues.items.map((item) =>
          item.item !== null ? "existing" : "custom"
        )
      );
    }
  }, [defaultValues, form]);

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

  const handleRemoveItem = (index: number) => {
    remove(index);
    setItemTypes((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: SalesOrderFormValues) => {
    console.log("Form submitted with data:", data);
    try {
      const payload = {
        ...data,
      };
      console.log("Payload being sent to API:", payload);
      const response = await updateSalesOrder({ salesOrderId, body: payload });
      console.log("Response from API:", response);
      if ("error" in response) {
        console.error("API error:", response.error);
        throw new Error("Update failed");
      }
      console.log("Sales order updated successfully");
      router.push(`/dashboard/sales?tab=Sales+Order`);
    } catch (error) {
      console.error("Error in update:", error);
    }
  };

  const t = useTranslations("Sales");
  const customerOptions = customers
    ? customers.map((customer: { id: number; customer_name: string }) => ({
        value: customer.id.toString(),
        label: customer.customer_name,
      }))
    : [];

  const branchesOptions =
    branchesData?.results?.map((branch: { id: number; name: string }) => ({
      value: branch.id.toString(),
      label: branch.name,
    })) || [];

  const existingItems = itemsData?.results || [];

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          console.log("Form data before submission:", data);
          onSubmit(data).catch((error) => {
            console.error("Form submission error:", error);
          });
        })}
      >
        <section className="min-h-[60vh]">
          <div className="grid sm:grid-cols-2 gap-x-4 gap-y-2 xl:gap-y-5 lg:gap-x-10">
            <DatePicker
              control={form.control}
              name="order_date"
              label={t("SalesOrder.orderDate")}
              placeholder={t("SalesOrder.orderDate")}
            />
            <CustomSelect
              valueType="number"
              control={form.control}
              name="customer"
              label={t("SalesOrder.customer")}
              placeholder={t("SalesOrder.customer")}
              options={customerOptions}
              onChange={(value) => {
                const customerId = parseInt(String(value), 10);
                form.setValue("customer", customerId);
              }}
            />
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
              label={t("SalesOrder.salesRepresentative")}
              placeholder={t("SalesOrder.salesRepresentative")}
            />
            <TextInput
              control={form.control}
              name="description"
              label={t("SalesOrder.description")}
              placeholder={t("SalesOrder.description")}
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
                      label={t("SalesOrder.selectItem")}
                      options={existingItems.map(
                        (item: { id: number; item_name: string }) => ({
                          value: item.id.toString(),
                          label: item.item_name,
                        })
                      )}
                      placeholder={t("SalesOrder.selectItem")}
                      onChange={(value) => {
                        if (value) {
                          const selectedItemId = parseInt(String(value), 10);
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
                        label={t("SalesOrder.customItemName")}
                        placeholder={t("SalesOrder.customItemName")}
                      />
                      <TextInput
                        control={form.control}
                        name={`items.${index}.custom_price`}
                        label={t("SalesOrder.customPrice")}
                        placeholder={t("SalesOrder.customPrice")}
                      />
                    </>
                  )}

                  <TextInput
                    control={form.control}
                    name={`items.${index}.quantity`}
                    label={t("SalesOrder.quantity")}
                    placeholder={t("SalesOrder.quantity")}
                    type="number"
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

                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(index)}
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

export default EditSalesOrderForm;
