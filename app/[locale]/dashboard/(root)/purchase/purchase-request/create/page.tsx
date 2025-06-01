"use client";
import { useTranslations } from "next-intl";
import { handleApiError } from "@/lib/utils/handleApiError";
import CreatePage from "@/components/dashboard/CreatePage";
import PurchaseRequestForm, {
  PurchaseRequestFormValues,
} from "@/components/dashboard/forms/purchase/PurchaseRequestForm";
import { useCreateRequestMutation } from "@/redux/services/dashboard/purchase/request";

export default function CreateRequest() {
  const t = useTranslations("Purchase.Request");
  const [createRequest, { isLoading }] = useCreateRequestMutation();

  const handleSubmit = async (data: PurchaseRequestFormValues) => {
    const payload = {
      ...data,
      id: Number(data.id),
      request_by: Number(data.request_by),
      branch: Number(data.branch),
      items: data.items.map((item) => ({
        ...item,
        id: Number(item.id),
        quantity: Number(item.quantity),
        unit_price: Number(item.unit_price),
        total: Number(item.total),
      })),
    };
    const response = await createRequest(payload);
    if (response.error) handleApiError(response.error);
  };

  return (
    <CreatePage
      title={t("addRequest")}
      onSubmit={handleSubmit}
      Form={PurchaseRequestForm}
      isLoading={isLoading}
      redirectPath="/dashboard/purchase?tab=request"
    />
  );
}
