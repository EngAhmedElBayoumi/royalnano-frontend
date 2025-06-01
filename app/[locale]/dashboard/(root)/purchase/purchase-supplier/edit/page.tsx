"use client";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { handleApiError } from "@/lib/utils/handleApiError";
import {
  useGetSupplierByIdQuery,
  useUpdateSupplierMutation,
} from "@/redux/services/dashboard/purchase/supplierApi";
import SupplierForm, {
  SupplierFormValues,
} from "@/components/dashboard/forms/purchase/SupplierForm";
import EditPage from "@/components/dashboard/EditPage";

export default function EditPurchaseSupplier() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const t = useTranslations("Purchase.Supplier");

  const { data, isLoading, error } = useGetSupplierByIdQuery(id);
  const [updateSupplier, { isLoading: submitting }] =
    useUpdateSupplierMutation();
  const defaultValues: SupplierFormValues | undefined = data && {
    ...data,
    title: data.title || "",
    full_name: data.full_name || "",
    supplier_name: data.supplier_name || "",
    phone_number: data.phone_number || "",
    street_address: data.street_address || "",
    city: data.city || "",
    province: data.province || "",
    country: data.country || "",
    postal_code: data.postal_code || "",
    taxes_business_id: data.taxes_business_id || "",
    expenses_rates_billing_rate: data.expenses_rates_billing_rate || "",
    payment_terms: data.payment_terms || "",
    account_no: data.account_no || "",
    opening_balance: data.opening_balance || "",
    as_of: data.as_of || "",
    suffix: data.suffix || "",
    additional_info: data.additional_info || "",
    branch: data.branch || 0,
    accounting_expenses_category: data.accounting_expenses_category || 0,
  };

  const handleSubmit = async (data: SupplierFormValues) => {
    const payload = {
      ...data,
      id: Number(data.id),
      branch: Number(data.branch),
      accounting_expenses_category: Number(data.accounting_expenses_category),
    };
    const response = await updateSupplier({ id, data: payload });
    if (response.error) handleApiError(response.error);
  };

  return (
    <EditPage
      title={t("editPurchaseSupplier")}
      data={defaultValues}
      isLoading={isLoading}
      submitting={submitting}
      error={error}
      onSubmit={handleSubmit}
      Form={SupplierForm}
      redirectPath="/dashboard/purchase?tab=supplier"
    />
  );
}
