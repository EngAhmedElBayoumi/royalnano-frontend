"use client";
import { useTranslations } from "next-intl";
import { handleApiError } from "@/lib/utils/handleApiError";
import { useCreateSalesInvoiceMutation } from "@/redux/services/dashboard/sales/salesInvoiceApi";
import { SalesInvoiceFormValues } from "@/lib/validations/dashboard/sales/salesInvoiceSchema";
import SalesInvoiceForm from "@/components/dashboard/forms/sales/SalesInvoiceForm";
import CreatePage from "@/components/dashboard/CreatePage";

export default function CreateSalesInvoice() {
  const t = useTranslations("Sales");
  const [createSalesInvoice, { isLoading }] = useCreateSalesInvoiceMutation();

  const handleSubmit = async (data: SalesInvoiceFormValues): Promise<void> => {
    const response = await createSalesInvoice(data);
    if (response.error) {
      handleApiError(response.error);
    }
  };

  return (
    <CreatePage
      title="Add Sales Invoice"
      onSubmit={handleSubmit}
      Form={SalesInvoiceForm}
      redirectPath={`/dashboard/sales?tab=${t("sales")}`}
      isLoading={isLoading}
    />
  );
}
