"use client";
import { useTranslations } from "next-intl";
import { handleApiError } from "@/lib/utils/handleApiError";
import CreatePage from "@/components/dashboard/CreatePage";
import { useCreateSupplierMutation } from "@/redux/services/dashboard/purchase/supplierApi";
import SupplierForm, {
  SupplierFormValues,
} from "@/components/dashboard/forms/purchase/SupplierForm";
// import PurchaseSupplierForm, { PurchaseSupplierFormValues } from "@/components/dashboard/forms/purchase/PurchaseSupplierForm";
// import { useCreateSupplierMutation } from "@/redux/services/dashboard/purchase/supplier";

export default function CreateSupplier() {
  const t = useTranslations("Purchase.Supplier");
  const [createSupplier, { isLoading }] = useCreateSupplierMutation();

  const handleSubmit = async (data: SupplierFormValues) => {
    const payload = {
      ...data,
      id: Number(data.id),
      supplier_by: Number(data.supplier_by),
      branch: Number(data.branch),
      // items: data.items.map((item: { id: number; quantity: number; unit_price: number; total: number; }) => ({
      //   ...item,
      //   id: Number(item.id),
      //   quantity: Number(item.quantity),
      //   unit_price: Number(item.unit_price),
      //   total: Number(item.total),
      // })),
    };

    const response = await createSupplier(payload);

    if (response.error) {
      handleApiError(response.error);
    }
  };

  return (
    <CreatePage
      title={t("addSupplier")}
      onSubmit={handleSubmit}
      Form={SupplierForm}
      redirectPath={`/dashboard/purchase?tab=${t("supplier")}`}
      isLoading={isLoading}
    />
  );
}
