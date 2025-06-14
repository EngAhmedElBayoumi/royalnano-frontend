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
        className="flex flex-col justify-center items-center gap-2"
      >
        <select
          {...form.register("status")}
          value={form.watch("status")}
          onChange={async (e) => {
            const newStatus = e.target.value;

            // تجاهل لو نفس القيمة أو مفيش داتا
            if (!salesQuotationData || newStatus === salesQuotationData.status)
              return;

            form.setValue("status", newStatus);

            if (newStatus === "accepted") {
              setIsDisabled(true);
            }

            try {
              const res = await updateSalesQuotation({
                id: quotationId,
                status: newStatus,
              }).unwrap();
              console.log("Updated successfully ✅", res);
              setMessage("✅ Status updated successfully");
            } catch (err) {
              console.error("Failed to update ❌", err);
              setMessage("❌ Failed to update status");
            }

            setTimeout(() => setMessage(""), 3000);
          }}
          disabled={isDisabled}
          className="w-48 px-2 py-1 border rounded-md text-sm shadow-sm"
        >
          <option value="" disabled>
            {salesQuotationData?.status
              ? `Current: ${salesQuotationData.status}`
              : "Select status"}
          </option>
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* {!isDisabled && (
          <CustomButton
            className="px-3 py-1 text-xs rounded-md text-white shadow-md transition-all duration-200"
            text="Save"
            type="submit"
          />
        )} */}

        {message && (
          <div
            className={`mt-2 px-3 py-2 rounded-md text-sm font-medium shadow-sm transition-all duration-300 ${
              message.includes("success")
                ? "bg-green-100 text-green-700 border border-green-300"
                : "bg-red-100 text-red-700 border border-red-300"
            }`}
          >
            {message}
          </div>
        )}
      </form>
    </FormProvider>
  );
};
