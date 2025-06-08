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
import {
  useGetSalesQuotationByIdQuery,
  useUpdateSalesQuotationMutation,
} from "@/redux/services/dashboard/sales/salesQuotationsApi";
import { useRouter } from "@/i18n/routing";
import { useEffect } from "react";

interface EditSalesQuotationFormProps {
  defaultValues?: SalesQuotationFormValues;
  quotationId: number;
}

export interface SalesQuotationFormValues {
  date: string;
  customer: number;
  validity_period: string;
  quotation_number: string;
  status: string;
  items: {
    item_name: string;
    quantity: number;
    unit_price: string;
    discount: string;
    discount_percent: string;
    tax_rate: string;
    total: string;
  }[];
}

const EditSalesQuotationForm = ({
  defaultValues,
  quotationId,
}: EditSalesQuotationFormProps) => {
  const router = useRouter();
  const t = useTranslations("Sales");
  const [updateSalesQuotation] = useUpdateSalesQuotationMutation();
  const { data: customers } = useGetMiniSalesCustomerQuery({});
  const {
    data: salesQuotationData,
    isLoading,
    isError,
  } = useGetSalesQuotationByIdQuery(quotationId);

  const form = useForm<SalesQuotationFormValues>({
    resolver: zodResolver(salesQuotationSchema),
    defaultValues: defaultValues || {
      date: "",
      customer: 0,
      validity_period: "",
      quotation_number: "",
      status: "sent",
      items: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  // Reset form values when salesQuotationData is fetched
  useEffect(() => {
    if (salesQuotationData) {
      form.reset({
        date: salesQuotationData.date,
        customer: salesQuotationData.customer,
        validity_period: salesQuotationData.validity_period,
        quotation_number: salesQuotationData.quotation_number,
        status: salesQuotationData.status,
        items: salesQuotationData.items,
      });
    }
  }, [salesQuotationData, form]);

  const handleAddItem = () => {
    append({
      item_name: "",
      quantity: 1,
      unit_price: "0",
      discount: "0",
      discount_percent: "0",
      tax_rate: "0",
      total: "0",
    });
  };

  const onSubmit = async (data: SalesQuotationFormValues) => {
    try {
      console.log("Form data submitted:", data);

      const itemsWithTotal = data.items.map((item) => {
        const unitPrice = parseFloat(item.unit_price || "0");
        const quantity = item.quantity;
        const discount = parseFloat(item.discount || "0");
        const taxRate = parseFloat(item.tax_rate || "0") / 100;
        const subtotal = unitPrice * quantity - discount;
        const total = subtotal * (1 + taxRate);

        return {
          ...item,
          total: total.toFixed(2),
        };
      });

      const totalAmount = itemsWithTotal
        .reduce((sum, item) => sum + parseFloat(item.total || "0"), 0)
        .toFixed(2);

      const payload = {
        date: data.date,
        customer: data.customer,
        validity_period: data.validity_period,
        items: itemsWithTotal,
        quotation_number: data.quotation_number,
        customer_name:
          customers?.find((c: { id: number }) => c.id === data.customer)
            ?.customer_name || "Default Customer",
        total_amount: totalAmount,
        status: data.status || "rejected",
        is_valid: "No",
      };

      console.log("Payload:", payload);

      if (quotationId) {
        const response = await updateSalesQuotation({
          id: quotationId,
          body: payload,
        });
        console.log(response);
        if ("error" in response) {
          console.error("API error:", response.error);
          throw new Error("Update failed");
        }
        console.log("Quotation updated successfully");
        //localhost:3001/en/dashboard/sales?tab=sales-quotation
        http: router.push(`/dashboard/sales?tab=sales-quotation`);
      } else {
        console.log("No ID was provided");
      }
    } catch (error) {
      console.error("Error in operation:", error);
    }
  };

  const customerOptions = customers
    ? customers.map((customer: { id: number; customer_name: string }) => ({
        value: customer.id.toString(),
        label: customer.customer_name,
      }))
    : [];

  if (isLoading) {
    return <div>Loading...</div>; // Show loading state
  }

  if (isError) {
    return <div>Error loading data.</div>; // Show error state
  }

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
                const customerId = parseInt(String(value), 10);
                form.setValue("customer", customerId);
              }}
            />
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
            <CustomSelect
              control={form.control}
              name="status"
              label={t("SalesQuotation.status")}
              placeholder={t("SalesQuotation.status")}
              options={[
                { value: "sent", label: "Sent" },
                { value: "accepted", label: "Accepted" },
                { value: "draft", label: "Draft" },
                { value: "rejected", label: "Rejected" },
              ]}
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
                  name={`items.${index}.item_name`}
                  label={t("SalesQuotation.itemName")}
                  placeholder={t("SalesQuotation.itemName")}
                />

                <TextInput
                  control={form.control}
                  name={`items.${index}.quantity`}
                  label={t("SalesQuotation.quantity")}
                  placeholder={t("SalesQuotation.quantity")}
                  type="number"
                />

                <TextInput
                  control={form.control}
                  name={`items.${index}.unit_price`}
                  label={t("SalesQuotation.unitPrice")}
                  placeholder={t("SalesQuotation.unitPrice")}
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

                <TextInput
                  control={form.control}
                  name={`items.${index}.tax_rate`}
                  label={t("SalesQuotation.taxRate")}
                  placeholder={t("SalesQuotation.taxRate")}
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
        </section>

        <div className="flex justify-end gap-2 mt-5 flex-col-reverse xs:flex-row">
          <Link href="/dashboard/sales?tab=sales-quotation" passHref>
            <CustomButton text={t("cancel")} variant="secondary" />
          </Link>
          <CustomButton text={t("save")} type="submit" />
        </div>
      </form>
    </Form>
  );
};

export default EditSalesQuotationForm;
