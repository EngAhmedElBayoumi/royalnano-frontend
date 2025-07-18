"use client";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { handleApiError } from "@/lib/utils/handleApiError";
import {
  useGetOrderByIdQuery,
  useUpdateOrderMutation,
} from "@/redux/services/dashboard/purchase/orderApi";
import PurchaseOrderForm, {
  PurchaseOrderFormValues,
} from "@/components/dashboard/forms/purchase/PurchaseOrderForm";
import EditPage from "@/components/dashboard/EditPage";

export default function EditOrder() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const t = useTranslations("purchase.Order");

  const { data, isLoading, error } = useGetOrderByIdQuery(id);
  const [updatePreorder] = useUpdateOrderMutation();

  const handleSubmit = async (data: PurchaseOrderFormValues) => {
    const response = await updatePreorder({ id, data });
    if (response.error) handleApiError(response.error);
  };

  return (
    <EditPage
      title={t("editPurchaseOrder")}
      data={data}
      isLoading={isLoading}
      error={error}
      onSubmit={handleSubmit}
      Form={PurchaseOrderForm}
      redirectPath="/dashboard/purchase?tab=order"
    />
  );
}
