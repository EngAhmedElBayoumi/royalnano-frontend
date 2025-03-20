"use client";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import EditPage from "@/components/dashboard/EditPage";
import { useGetSupplierByIdQuery, useUpdateSupplierMutation } from "@/redux/services/dashboard/purchase/supplierApi";
import SupplierForm, { SupplierFormValues } from "@/components/dashboard/forms/purchase/SupplierForm";

export default function EditPurchaseSupplier() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const t = useTranslations("Purchase.Supplier");
  const tabTranslate = useTranslations("Purchase");

  // Fetch supplier data by ID
  const { data, isLoading, error } = useGetSupplierByIdQuery(id);

  // Mutation for updating supplier
  const [updateSupplier] = useUpdateSupplierMutation();

  // Set default values if data is available
  const defaultValues: SupplierFormValues | undefined = data && {
    ...data,
    // Ensure no null values are passed to the form
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

  // Handle form submission
  const handleSubmit = async (data: SupplierFormValues) => {
    try {
      const payload = {
        ...data,
        id: Number(data.id), // Ensure ID is a number
        branch: Number(data.branch), // Ensure branch is a number
        accounting_expenses_category: Number(data.accounting_expenses_category), // Ensure category is a number
      };

      console.log("Payload being sent to the API:", payload); // Log the payload

      const response = await updateSupplier({ id, data: payload });

      console.log("API Response:", response); // Log the full API response

      // Handle API errors
      if ("error" in response) {
        const errorMessage = response.data.message || "Edit failed";
        console.error("API Error Details:", response.error); // Log the error details
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error("Error updating supplier:", error);
      throw error; // Re-throw the error to display it in the UI
    }
  };

  return (
    <EditPage
      title={t("editPurchaseSupplier")}
      data={defaultValues}
      isLoading={isLoading}
      error={error}
      onSubmit={handleSubmit}
      Form={SupplierForm}
      redirectPath={`/dashboard/purchase?tab=${tabTranslate("supplier")}`}
    />
  );
}