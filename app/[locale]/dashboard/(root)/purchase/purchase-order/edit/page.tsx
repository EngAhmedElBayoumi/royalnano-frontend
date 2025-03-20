"use client";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import EditPage from "@/components/dashboard/EditPage";

import PurchaseRequestForm, { PurchaseRequestFormValues } from "@/components/dashboard/forms/purchase/PurchaseRequestForm";
import { useGetRequestByIdQuery, useUpdateRequestMutation } from "@/redux/services/dashboard/purchase/request";

export default function EdirPurchaseRequest() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const t = useTranslations("Purchase.Request");
  const tabTranslate = useTranslations("Purchase");
  const { data, isLoading, error } = useGetRequestByIdQuery(id);
  const [updatePrerequest] = useUpdateRequestMutation();

  const defaultValues: PurchaseRequestFormValues = data && {
    ...data,
  };

  const handleSubmit = async (data: PurchaseRequestFormValues) => {
    const payload = {
      ...data,
    };
    const response = await updatePrerequest({ id, data: payload });
    if (response.error) throw new Error("edit failed");
  };

  return (
    <EditPage
      title={t("editPurchaseRequest")}
      data={defaultValues}
      isLoading={isLoading}
      error={error}
      onSubmit={handleSubmit}
      Form={PurchaseRequestForm}
      redirectPath={`/dashboard/purchase?tab=${tabTranslate("request")}`}
    />
  );
}
