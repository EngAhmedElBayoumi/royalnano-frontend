"use client";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { handleApiError } from "@/lib/utils/handleApiError";
import {
  useGetSalesCustomerByIdQuery,
  useUpdateSalesCustomerMutation,
} from "@/redux/services/dashboard/sales/salesCustomerApi";
import { SalesCustomerFormValues } from "@/lib/validations/dashboard/sales/salesCustomerSchema";
import SalesCustomerForm from "@/components/dashboard/forms/sales/SalesCustomerForm";
import EditPage from "@/components/dashboard/EditPage";

export default function EditSalesCustomer() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const t = useTranslations("Sales");

  const { data, isLoading, error } = useGetSalesCustomerByIdQuery(id);
  const [updateSalesCustomer, { isLoading: submitting }] =
    useUpdateSalesCustomerMutation();

  const customerIdFromQuery = searchParams.get("customerId");
  const initialCustomerId = customerIdFromQuery
    ? parseInt(customerIdFromQuery, 10)
    : 0;
  const defaultValues = data && {
    ...data,
    branch: data.branch.id,
    assigned_to: data.assigned_to.id,
  };

  const handleSubmit = async (data: SalesCustomerFormValues) => {
    const payload = {
      ...data,
      branch: Number(data.branch),
      assigned_to: Number(data.assigned_to),
    };
    const response = await updateSalesCustomer({ id, data: payload });
    if (response.error) handleApiError(response.error);
  };
  return (
    <EditPage
      title={t("editCustomer")}
      data={defaultValues}
      isLoading={isLoading}
      submitting={submitting}
      error={error}
      onSubmit={handleSubmit}
      Form={SalesCustomerForm}
      redirectPath={
        initialCustomerId
          ? `/dashboard/sales/sales-customer/view?id=${initialCustomerId}&tab=details`
          : `/dashboard/sales?tab=sales-customer`
      }
    />
  );
}
