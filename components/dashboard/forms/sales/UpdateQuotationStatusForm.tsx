/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomSelect from "@/components/formFields/CustomSelect";
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
  const { data: salesQuotationData, isLoading } = useGetSalesQuotationByIdQuery(
    quotationId && quotationId
  );
  // console.log(quotationId);
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

    try {
      const res = await updateSalesQuotation({
        id: quotationId,
        ...values,
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
        className="flex flex-row justify-center items-center gap-2 "
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <CustomSelect
          valueType="string"
          control={form.control}
          name="status"
          // value={salesQuotationData?.status}
          // label="Choose status"
          options={statusOptions}
          placeholder="Select status"
        />
        <CustomButton
          className="w-[50%] text-sm p-0"
          text="Save"
          type="submit"
        />
        {/* <button type="submit">Save</button> */}
      </form>
    </FormProvider>
  );
};
