"use client";
import { useTranslations } from "next-intl";
import { handleApiError } from "@/lib/utils/handleApiError";
import { useCreateSalesCustomerMutation } from "@/redux/services/dashboard/sales/salesCustomerApi";
// import { SalesCustomerFormValues } from "@/lib/validations/dashboard/sales/salesCustomerSchema";
import SalesCustomerForm from "@/components/dashboard/forms/sales/SalesCustomerForm";
import CreatePage from "@/components/dashboard/CreatePage";
import { SalesCustomerFormValues } from "@/lib/validations/dashboard/sales/salesCustomerSchema";
// import { SalesCustomerFormValues } from "@/lib/validations/dashboard/sales/salesCustomerSchema";

export default function CreateSalesCustomer() {
  const t = useTranslations("Sales");

  const [createSalesCustomer, { isLoading }] = useCreateSalesCustomerMutation();

  const handleSubmit = async (data: SalesCustomerFormValues) => {
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
