"use client";
import { Form } from "@/components/ui/form";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomButton from "@/components/formFields/CustomButton";
import TextInput from "@/components/formFields/TextInput";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { salesQuotationSchema } from "@/lib/validations/dashboard/sales/salesQuotationSchema";
import DatePicker from "@/components/formFields/DatePicker";
import { useGetMiniSalesCustomerQuery } from "@/redux/services/dashboard/sales/salesCustomerApi";
import CustomSelect from "@/components/formFields/CustomSelect";
import { useState } from "react";
import { useGetItemsQuery } from "@/redux/services/dashboard/inventory/itemsApi";
import { useCreateSalesQuotationMutation } from "@/redux/services/dashboard/sales/salesQuotationsApi";
import { useRouter } from "@/i18n/routing";

interface AddSalesQuotationFormProps {
  defaultValues?: SalesQuotationFormValues;
}

export interface SalesQuotationFormValues {
  date: string;
  customer: number;
  validity_period: string;
  quotation_number: string;
  status: string;
  items: {
    quantity: number;
    item: number | null;
    custom_item_name: string;
    custom_price: string;
    discount: string;
    discount_percent: string;
  }[];
}

const AddSalesQuotationForm = ({ defaultValues }: AddSalesQuotationFormProps) => {
  const router = useRouter();
  const t = useTranslations("Sales");
  const [createSalesQuotation] = useCreateSalesQuotationMutation();
  const { data: customers } = useGetMiniSalesCustomerQuery({});
  const { data: itemsData, isLoading: isItemsLoading } = useGetItemsQuery({
    search: "",
    ordering: "id",
    page: 1,
    page_size: 10,
  });

  const form = useForm<SalesQuotationFormValues>({
    resolver: zodResolver(salesQuotationSchema),
    defaultValues: defaultValues || {
      date: new Date().toISOString().split("T")[0],
      customer: 1,
      validity_period: new Date().toISOString().split("T")[0],
      quotation_number: "",
      status: "rejected",
      items: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

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

  const onSubmit = async (data: SalesQuotationFormValues) => {
    try {
      console.log("Form data submitted:", data);
      const payload = {
        ...data,
        items: data.items.map((item) => ({
          ...item,
          total: (item.quantity * parseFloat(item.custom_price || "0")).toString(), // Calculate total
        })),
      };
      console.log("Payload:", payload);
      const response = await createSalesQuotation(payload);
      if ("error" in response) {
        console.error("API error:", response.error);
        throw new Error("Creation failed");
      }
      console.log("Quotation created successfully");
      router.push(`/dashboard/sales?tab=Quotation`);
    } catch (error) {
      console.error("Error in creation:", error);
    }
  };

  const customerOptions = customers
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ? customers.map((customer: { id: { toString: () => any; }; customer_name: any; }) => ({
        value: customer.id.toString(),
        label: customer.customer_name,
      }))
    : [];

  const existingItems = itemsData?.results || [];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <section className="min-h-[60vh]">
          <div className="grid sm:grid-cols-2 gap-x-4 gap-y-2 xl:gap-y-5 lg:gap-x-10">
            <DatePicker
              control={form.control}
              name="date"
              label={t("SalesQuotation.date")}
              placeholder={t("SalesQuotation.date")}
            />
           <CustomSelect
              valueType="number"
              control={form.control}
              name="customer"
              label={t("SalesQuotation.customer")}
              placeholder={t("SalesQuotation.customer")}
              options={customerOptions}
              onChange={(value) => {
                const customerId = parseInt(value, 10);
                form.setValue("customer", customerId);
              }}
            />
             {/* <CustomSelect
            valueType="number"
              control={form.control}
              name="customer"
              label={t("SalesOrder.customer")}
              placeholder={t("SalesOrder.customer")}
              options={customerOptions}
              onChange={(value) => {
                const customerId = parseInt(value, 10);
                form.setValue("customer", customerId);
              }}
            /> */}
            <DatePicker
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

          {/* Items Section */}
          <div className="mt-6">
            {fields.map((field, index) => {
              const itemType = itemTypes[index];

              return (
                <div key={field.id} className="col-span-2 border p-4 rounded-lg mb-4">
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

                  {itemType === "existing" && (
                    <CustomSelect
                      valueType="number"
                      control={form.control}
                      name={`items.${index}.item`}
                      label={t("SalesQuotation.selectItem")}
                      options={existingItems.map((item: { id: number; item_name: string }) => ({
                        value: item.id.toString(),
                        label: item.item_name,
                      }))}
                      placeholder={t("SalesQuotation.selectItem")}
                      onChange={(value) => {
                        if (value) {
                          const selectedItemId = parseInt(value, 10);
                          form.setValue(`items.${index}.item`, selectedItemId);
                        }
                      }}
                      isLoading={isItemsLoading}
                    />
                  )}

                  {itemType === "custom" && (
                    <>
                      <TextInput
                        control={form.control}
                        name={`items.${index}.custom_item_name`}
                        label={t("SalesQuotation.customItemName")}
                        placeholder={t("SalesQuotation.customItemName")}
                      />
                      <TextInput
                        control={form.control}
                        name={`items.${index}.custom_price`}
                        label={t("SalesQuotation.customPrice")}
                        placeholder={t("SalesQuotation.customPrice")}
                      />
                    </>
                  )}

                  <TextInput
                    control={form.control}
                    name={`items.${index}.quantity`}
                    label={t("SalesQuotation.quantity")}
                    placeholder={t("SalesQuotation.quantity")}
                    type="number"
                  />

                  <TextInput
                    control={form.control}
                    name={`items.${index}.discount`}
                    label={t("SalesQuotation.discount")}
                    placeholder={t("SalesQuotation.discount")}
                  />

                  <TextInput
                    control={form.control}
                    name={`items.${index}.discount_percent`}
                    label={t("SalesQuotation.discountPercent")}
                    placeholder={t("SalesQuotation.discountPercent")}
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
          <Link href={`/dashboard/sales?tab=${t("quotation")}`} passHref>
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

export default AddSalesQuotationForm;