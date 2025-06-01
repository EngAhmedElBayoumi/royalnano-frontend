"use client";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { handleApiError } from "@/lib/utils/handleApiError";
import {
  useGetClientRequestByIdQuery,
  useUpdateClientRequestMutation,
} from "@/redux/services/clientRequestApi";
import ClientRequestForm, {
  ClientRequestFormValues,
} from "@/components/dashboard/forms/sales/ClientRequestForm";
import EditPage from "@/components/dashboard/EditPage";

export default function EditClientRequest() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const t = useTranslations("Sales");

  const { data, isLoading, error } = useGetClientRequestByIdQuery(id);
  const [updateClientRequest, { isLoading: submitting }] =
    useUpdateClientRequestMutation();

  const handleSubmit = async (data: ClientRequestFormValues) => {
    const response = await updateClientRequest({ id, data }).unwrap();
    if (response.error) handleApiError(response.error);
  };

  return (
    <EditPage
      title={t("editCustomer")}
      data={data}
      isLoading={isLoading}
      submitting={submitting}
      error={error}
      onSubmit={handleSubmit}
      Form={ClientRequestForm}
      redirectPath="/dashboard/sales?tab=client-request"
    />
  );
}
