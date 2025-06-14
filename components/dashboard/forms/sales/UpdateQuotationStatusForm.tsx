"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { z } from "zod";

import CustomSelect from "@/components/formFields/CustomSelect";
import CustomButton from "@/components/formFields/CustomButton";
import {
  useGetSalesQuotationByIdQuery,
  useUpdateSalesQuotationMutation,
} from "@/redux/services/dashboard/sales/salesQuotationsApi";

// Status Options
const statusOptions = [
  { value: "sent", label: "Sent" },
  { value: "accepted", label: "Accepted" },
  { value: "draft", label: "Draft" },
  { value: "rejected", label: "Rejected" },
];

// Validation Schema
const salesQuotationSchema = z.object({
  status: z.enum(["sent", "accepted", "draft", "rejected"], {
    errorMap: () => ({ message: "Status is required" }),
  }),
});

export const UpdateQuotationStatusForm = ({
  quotationId,
}: {
  quotationId: number;
}) => {
  const { data: salesQuotationData, isLoading } =
    useGetSalesQuotationByIdQuery(quotationId);

  const [updateSalesQuotation] = useUpdateSalesQuotationMutation();
  const [message, setMessage] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  const form = useForm({
    resolver: zodResolver(salesQuotationSchema),
    defaultValues: {
      status: "",
    },
  });
  useEffect(() => {
    if (salesQuotationData) {
      form.reset({ status: salesQuotationData.status });
      if (salesQuotationData.status === "accepted") {
        setIsDisabled(true);
      }
    }
  }, [salesQuotationData]);

  // Submit handler
  const onSubmit = async (values: any) => {
    if (!salesQuotationData || values.status === salesQuotationData.status)
      return;

    try {
      if (values.status === "accepted") {
        setIsDisabled(true);
      }

      const res = await updateSalesQuotation({
        id: quotationId,
        ...values,
      }).unwrap();

      console.log("Updated successfully ✅", res);
      setMessage("Saved successfully ✅");
    } catch (err) {
      console.error("Failed to update ❌", err);
      setMessage("Saving failed ❌");
    }

    setTimeout(() => setMessage(""), 3000);
  };

  if (isLoading || !salesQuotationData) return null;

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-row justify-center items-center gap-2"
      >
        <CustomSelect
          control={form.control}
          name="status"
          onChange={(value) => console.log(value)}
          options={statusOptions}
          placeholder={
            salesQuotationData?.status
              ? salesQuotationData?.status
              : // statusOptions.find((opt) => opt.value === salesQuotationData.status)?.label
                "Select status"
          }
          readonly={isDisabled}
        />

        {!isDisabled && (
          <CustomButton
            className="w-[50%] text-sm p-0"
            text="Save"
            type="submit"
          />
        )}

        {message && (
          <p className="text-green-600 font-semibold text-sm mt-2">{message}</p>
        )}
      </form>
    </FormProvider>
  );
};
