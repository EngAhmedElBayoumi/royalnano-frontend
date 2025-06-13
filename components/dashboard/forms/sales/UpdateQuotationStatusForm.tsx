/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomSelect from "@/components/formFields/CustomSelect";
import CustomButton from "@/components/formFields/CustomButton";
import {
  useGetSalesQuotationByIdQuery,
  useUpdateSalesQuotationMutation,
} from "@/redux/services/dashboard/sales/salesQuotationsApi";
import { useEffect } from "react";
import { z } from "zod";

const statusOptions = [
  { value: "sent", label: "Sent" },
  { value: "accepted", label: "Accepted" },
  { value: "draft", label: "Draft" },
  { value: "rejected", label: "Rejected" },
];

export const UpdateQuotationStatusForm = ({
  quotationId,
}: {
  quotationId: number;
}) => {
  const { data: salesQuotationData, isLoading } =
    useGetSalesQuotationByIdQuery(quotationId);
  console.log(quotationId);
  // console.log(salesQuotationData);
  const [updateSalesQuotation] = useUpdateSalesQuotationMutation();
  const salesQuotationSchema = z.object({
    status: z.enum(["sent", "accepted", "draft", "rejected"], {
      errorMap: () => ({ message: "Status is required" }),
    }),
  });
  const form = useForm({
    resolver: zodResolver(salesQuotationSchema),
    defaultValues: {
      status: salesQuotationData?.status,
    },
  });

  useEffect(() => {
    if (salesQuotationData) {
      form.setValue("status", salesQuotationData.status);
    }
  }, [salesQuotationData, form]);

  const onSubmit = async (values: any) => {
    if (!salesQuotationData) return;

    const updatedPayload = {
      ...salesQuotationData,
      status: values.status, // ✅ المستخدم غيرها
      extra_fields: salesQuotationData.extra_fields ?? {},
      items: salesQuotationData.items.map((item: any) => ({
        item_name: item.item_name,
        quantity: item.quantity,
        unit_price: item.unit_price,
        discount: item.discount,
        discount_percent: item.discount_percent,
        tax_rate: item.tax_rate,
        total: item.total,
        extra_fields: item.extra_fields ?? {},
      })),
    };
    console.log("payload", updatedPayload);
    try {
      const res = await updateSalesQuotation({
        id: quotationId,
        data: updatedPayload,
      }).unwrap();

      console.log("Updated successfully ✅", res);
    } catch (err) {
      console.error("Failed to update ❌", err);
    }
  };

  if (isLoading) return <span>Loading...</span>;
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-center gap-2"
      >
        <CustomSelect
          valueType="string"
          control={form.control}
          name="status"
          // value={salesQuotationData?.status}
          label="Choose status"
          options={statusOptions}
          placeholder="Select status"
        />
        {/* <CustomButton text="Save" type="submit" /> */}
        <button type="submit">Save</button>
      </form>
    </FormProvider>
  );
};
