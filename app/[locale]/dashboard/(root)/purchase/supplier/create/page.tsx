"use client";
import { useTranslations } from "next-intl";
import { handleApiError } from "@/lib/utils/handleApiError";
import { useCreateSupplierMutation } from "@/redux/services/dashboard/purchase/supplierApi";
import SupplierForm, {
  SupplierFormValues,
} from "@/components/dashboard/forms/purchase/SupplierForm";
import CreatePage from "@/components/dashboard/CreatePage";

export default function CreateSupplier() {
  const t = useTranslations("purchase.Supplier");
  const [createSupplier, { isLoading }] = useCreateSupplierMutation();

  const handleSubmit = async (data: SupplierFormValues) => {
    const payload = {
      ...data,
      opening_balance: String(data.opening_balance),
      branch: data.branch || null,
      accounting_expenses_category: data.accounting_expenses_category || null,
    };
    const response = await createSupplier(payload);
    if (response.error) handleApiError(response.error);
  };

  return (
    <CreatePage
      title={t("addSupplier")}
      onSubmit={handleSubmit}
      Form={SupplierForm}
      redirectPath="/dashboard/purchase?tab=supplier"
      isLoading={isLoading}
    />
  );
}
