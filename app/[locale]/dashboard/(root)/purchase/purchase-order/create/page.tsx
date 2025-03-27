"use client";
import { useTranslations } from "next-intl";
import CreatePage from "@/components/dashboard/CreatePage";
import PurchaseOrderForm, {
  PurchaseOrderFormValues,
} from "@/components/dashboard/forms/purchase/PurchaseOrderForm";
import { useCreateOrderMutation } from "@/redux/services/dashboard/purchase/orderApi";

export default function CreateOrder() {
  const t = useTranslations("Purchase.Order");
  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const handleSubmit = async (data: PurchaseOrderFormValues) => {
    const payload = {
      ...data,
      id: Number(data.id),
      branch: Number(data.branch),
      supplier: Number(data.supplier),
      items: data.items.map((item) => ({
        ...item,
        id: Number(item.id),
        quantity: Number(item.quantity),
        unit_price: Number(item.unit_price),
        bonus: Number(item.bonus),
        amount: Number(item.amount),
        discount: Number(item.discount),
        discount_percent: Number(item.discount_percent),
        vat_kd: Number(item.vat_kd),
        total: Number(item.total),
      })),
      invoice_detail: {
        ...data.invoice_detail,
        discount: Number(data.invoice_detail.discount),
        vat: Number(data.invoice_detail.vat),
        subtotal: Number(data.invoice_detail.subtotal),
        quantity: Number(data.invoice_detail.quantity),
        free_quantity: Number(data.invoice_detail.free_quantity),
        total: Number(data.invoice_detail.total),
      },
    };

    const response = await createOrder(payload);

    if (response.error) {
      throw new Error("Creation failed");
    }
  };

  return (
    <CreatePage
      title={t("addOrder")}
      onSubmit={handleSubmit}
      Form={PurchaseOrderForm}
      redirectPath={`/dashboard/purchase?tab=${t("order")}`}
      isLoading={isLoading}
    />
  );
}
