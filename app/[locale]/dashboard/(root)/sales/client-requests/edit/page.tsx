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
  data && console.log(data);
  // const defaultValues: ClientRequestFormValues = {
  //   branch: data.branch || "",
  //   car_model: data.car_model || "",

  //   full_name: data.full_name || "",
  //   description: data.description || "",
  //   car_type: data.car_type || "",
  //   order_note: data.order_note || "",
  //   phone_number: data.phone_number || "",
  //   service: data.service.id || "",
  //   status: data.status || "",
  // };
  return (
    <EditPage
      title={t("editCustomer")}
      // data={defaultValues}
      data={{ ...data, service: data?.service?.id }}
      isLoading={isLoading}
      submitting={submitting}
      error={error}
      onSubmit={handleSubmit}
      Form={ClientRequestForm}
      redirectPath="/dashboard/sales?tab=client-request"
    />
  );
}
