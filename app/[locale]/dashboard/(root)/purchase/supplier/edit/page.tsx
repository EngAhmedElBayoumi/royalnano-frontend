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

export default function EditSupplier() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const t = useTranslations("purchase.Supplier");

  const { data, isLoading, error } = useGetSupplierByIdQuery(id);
  console.log(data);
  const [updateSupplier, { isLoading: submitting }] =
    useUpdateSupplierMutation();

  const defaultValues: SupplierFormValues | undefined = data && {
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
    expenses_rates_billing_rate: Math.floor(
      data.expenses_rates_billing_rate || 0
    ),
    payment_terms: data.payment_terms || "",
    account_no: data.account_no || "",
    opening_balance: Math.floor(data.opening_balance || 0),
    as_of: data.as_of || "",
    suffix: data.suffix || "",
    additional_info: data.additional_info || "",
    branch: data.branch?.id || 11,
    accounting_expenses_category: data.accounting_expenses_category?.id || 9,
  };

  const handleSubmit = async (formData: SupplierFormValues) => {
    const payload = {
      ...formData,
      opening_balance: String(formData.opening_balance),
      branch: formData.branch || null,
      accounting_expenses_category:
        formData.accounting_expenses_category || null,
    };
    const response = await updateSupplier({ id, data: payload });
    if (response.error) handleApiError(response.error);
  };

  return (
    <EditPage
      title={t("editSupplier")}
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
