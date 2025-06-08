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

  const { data, isLoading, error } = useGetSalesInvoiceByIdQuery(id);
  const defaultValues: SalesInvoiceFormValues = data && {
    invoice_date: data.invoice_date || "",
    due_date: data.due_date || "",
    sales_representative: data.sales_representative || "John Doe",
    total_amount: Number(data.total_amount) || 0,
    status: data.status || "paid",
    description: data.description || "",
    quotation: data.quotation || 1,
    customer: data.customer?.id || 1,
    branch: data.branch?.id || 41,
    invoice_number: data.invoice_number || "",
    created_at: data.created_at || "",
    extra_fields: data.extra_fields || {},
    items:
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data.items?.map((item: any) => ({
        item: item.item,
        quantity: item.quantity,
        unit_price: item.unit_price,
        discount: item.discount,
        discount_percent: item.discount_percent,
        total: item.total,
        extra_fields: item.extra_fields || {},
      })) || [],
    consumed_items:
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data.consumed_items?.map((cItem: any) => ({
        inventory_item: cItem.inventory_item,
        quantity: cItem.quantity,
      })) || [],
  };

  const [updateSalesInvoice, { isLoading: submitting }] =
    useUpdateSalesInvoiceMutation();

  const handleSubmit = async (data: SalesInvoiceFormValues) => {
    const response = await updateSalesInvoice({ id, data });
    if (response.error) handleApiError(response.error);
  };

  return (
    <EditPage
      title={t("salesInvoice")}
      data={defaultValues}
      isLoading={isLoading}
      error={error}
      onSubmit={handleSubmit}
      Form={SalesInvoiceForm}
      submitting={submitting}
      redirectPath="/dashboard/sales?tab=sales-invoice"
    />
  );
}
