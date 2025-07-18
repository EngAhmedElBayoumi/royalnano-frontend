"use client";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useGetSupplierByIdQuery } from "@/redux/services/dashboard/purchase/supplierApi";
import SupplierForm, {
  SupplierFormValues,
} from "@/components/dashboard/forms/purchase/SupplierForm";
import ViewPage from "@/components/dashboard/ViewPage";

export default function ViewSupplier() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const t = useTranslations("purchase.Supplier");

  const { data, isLoading, error } = useGetSupplierByIdQuery(id);

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
    expenses_rates_billing_rate: data.expenses_rates_billing_rate || 0,
    payment_terms: data.payment_terms || "",
    account_no: data.account_no || "",
    opening_balance: data.opening_balance || 0,
    as_of: data.as_of || "",
    suffix: data.suffix || "",
    additional_info: data.additional_info || "",
    branch: data.branch?.id || null,
    accounting_expenses_category: data.accounting_expenses_category?.id || null,
  };

  const handleSubmit = async (formData: SupplierFormValues) => {
    console.log(formData);
  };

  return (
    <ViewPage
      title={t("viewSupplier")}
      data={defaultValues}
      isLoading={isLoading}
      error={error}
      onSubmit={handleSubmit}
      Form={SupplierForm}
    />
  );
}
