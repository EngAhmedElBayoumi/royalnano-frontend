"use client";
import { useTranslations } from "next-intl";
import { handleApiError } from "@/lib/utils/handleApiError";
import { useCreateClientRequestMutation } from "@/redux/services/clientRequestApi";
import ClientRequestForm, {
  ClientRequestFormValues,
} from "@/components/dashboard/forms/sales/ClientRequestForm";
import CreatePage from "@/components/dashboard/CreatePage";

export default function CreateClientRequest() {
  const t = useTranslations("Sales");
  const [createClientRequest, { isLoading }] = useCreateClientRequestMutation();

  const handleSubmit = async (data: ClientRequestFormValues) => {
    const response = await createClientRequest(data).unwrap();
    if (response.error) handleApiError(response.error);
  };

  return (
    <CreatePage
      title={t("addCustomer")}
      onSubmit={handleSubmit}
      Form={ClientRequestForm}
      isLoading={isLoading}
      redirectPath="/dashboard/sales?tab=client-request"
    />
  );
}
