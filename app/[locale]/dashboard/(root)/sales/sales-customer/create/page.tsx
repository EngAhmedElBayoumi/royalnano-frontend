"use client";
import { useTranslations } from "next-intl";
import { handleApiError } from "@/lib/utils/handleApiError";
import { useCreateSalesCustomerMutation } from "@/redux/services/dashboard/sales/salesCustomerApi";
import { SalesCustomerFormValues } from "@/lib/validations/dashboard/sales/salesCustomerSchema";
import SalesCustomerForm from "@/components/dashboard/forms/sales/SalesCustomerForm";
import CreatePage from "@/components/dashboard/CreatePage";

export default function CreateSalesCustomer() {
  const t = useTranslations("Sales");

  const [createSalesCustomer, { isLoading }] = useCreateSalesCustomerMutation();

  const handleSubmit = async (data: SalesCustomerFormValues) => {
    const payload = {
      ...data,
      phone_numbers_data: "Primary contact numbers", // Or make this a form field
      attachments_data: "Contract and ID documents", // Or make this a form field
    };
    try {
      await createSalesCustomer(payload);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      console.error("Submission error:", Error);
    }
    const response = await createSalesCustomer(data);
    if (response.error) handleApiError(response.error);
  };
  return (
    <CreatePage
      title={t("addCustomer")}
      onSubmit={handleSubmit}
      Form={SalesCustomerForm}
      redirectPath="/dashboard/sales?tab=sales-customer"
      isLoading={isLoading}
    />
  );
}
