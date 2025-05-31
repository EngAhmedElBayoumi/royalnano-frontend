"use client";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { handleApiError } from "@/lib/utils/handleApiError";
import {
  useGetRequestByIdQuery,
  useUpdateRequestMutation,
} from "@/redux/services/dashboard/purchase/request";
import PurchaseRequestForm, {
  PurchaseRequestFormValues,
} from "@/components/dashboard/forms/purchase/PurchaseRequestForm";
import EditPage from "@/components/dashboard/EditPage";

export default function EditPurchaseRequest() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const t = useTranslations("Purchase.Request");
  const tabTranslate = useTranslations("Purchase");
  const { data, isLoading, error } = useGetRequestByIdQuery(id);
  const [updatePreRequest, { isLoading: submitting }] =
    useUpdateRequestMutation();

  const handleSubmit = async (data: PurchaseRequestFormValues) => {
    const response = await updatePreRequest({ id, data });
    if (response.error) handleApiError(response.error);
  };

  return (
    <EditPage
      title={t("editPurchaseRequest")}
      data={data}
      isLoading={isLoading}
      error={error}
      onSubmit={handleSubmit}
      Form={PurchaseRequestForm}
      submitting={submitting}
      redirectPath={`/dashboard/purchase?tab=${tabTranslate("request")}`}
    />
  );
}
