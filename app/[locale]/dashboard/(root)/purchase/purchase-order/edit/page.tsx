"use client";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import EditPage from "@/components/dashboard/EditPage";

import PurchaseOrderForm, { PurchaseOrderFormValues } from "@/components/dashboard/forms/purchase/PurchaseOrderForm";
import { useGetOrderByIdQuery, useUpdateOrderMutation } from "@/redux/services/dashboard/purchase/orderApi";

export default function EdirPurchaseOrder() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const t = useTranslations("Purchase.Order");
  const tabTranslate = useTranslations("Purchase");
  const { data, isLoading, error } = useGetOrderByIdQuery(id);
  const [updatePreorder] = useUpdateOrderMutation();

  const defaultValues: PurchaseOrderFormValues = data && {
    ...data,
  };

  const handleSubmit = async (data: PurchaseOrderFormValues) => {
    const payload = {
      ...data,
    };
    const response = await updatePreorder({ id, data: payload });
    if (response.error) throw new Error("edit failed");
  };

  return (
    <EditPage
      title={t("editPurchaseOrder")}
      data={defaultValues}
      isLoading={isLoading}
      error={error}
      onSubmit={handleSubmit}
      Form={PurchaseOrderForm}
      redirectPath={`/dashboard/purchase?tab=${tabTranslate("order")}`}
    />
  );
}
