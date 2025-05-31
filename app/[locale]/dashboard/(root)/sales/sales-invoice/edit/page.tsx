"use client";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { handleApiError } from "@/lib/utils/handleApiError";
import {
  useGetSalesInvoiceByIdQuery,
  useUpdateSalesInvoiceMutation,
} from "@/redux/services/dashboard/sales/salesInvoiceApi";
import SalesInvoiceForm, {
  SalesInvoiceFormValues,
} from "@/components/dashboard/forms/sales/SalesInvoiceForm";
import EditPage from "@/components/dashboard/EditPage";

export default function EditSalesInvoice() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const t = useTranslations("Sales.SalesInvoice");
  const tabTranslate = useTranslations("Sales");

  const { data, isLoading, error } = useGetSalesInvoiceByIdQuery(id);
  const [updatePreorder, { isLoading: submitting }] =
    useUpdateSalesInvoiceMutation();

  const handleSubmit = async (data: SalesInvoiceFormValues) => {
    const response = await updatePreorder({ id, data });

    if (response.error) handleApiError(response.error);
  };

  return (
    <EditPage
      title={t("salesInvoice")}
      data={data}
      isLoading={isLoading}
      error={error}
      onSubmit={handleSubmit}
      Form={SalesInvoiceForm}
      submitting={submitting}
      redirectPath={`/dashboard/sales?tab=${tabTranslate("salesInvoice")}`}
    />
  );
}
