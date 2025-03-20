"use client";
import { useTranslations } from "next-intl";
import CreatePage from "@/components/dashboard/CreatePage";
import PurchaseRequestForm, { PurchaseRequestFormValues } from "@/components/dashboard/forms/purchase/PurchaseRequestForm";
import { useCreateRequestMutation } from "@/redux/services/dashboard/purchase/request";

export default function CreateRequest() {
  const t = useTranslations("Purchase.Request");
  const [createRequest] = useCreateRequestMutation();

  const handleSubmit = async (data: PurchaseRequestFormValues) => {
    try {
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

      if ("error" in response) {
        throw new Error("Creation failed");
      }
    } catch (error) {
      console.error("Error creating request:", error);
      throw error; 
    }
  };

  return (
    <CreatePage
      title={t("addRequest")} 
      onSubmit={handleSubmit}
      Form={PurchaseRequestForm}
      redirectPath={`/dashboard/purchase?tab=${t("request")}`}
    />
  );
}