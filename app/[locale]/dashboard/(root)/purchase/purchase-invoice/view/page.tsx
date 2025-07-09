"use client";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import PurchaseInvoiceForm, { PurchaseInvoiceFormValues } from "@/components/dashboard/forms/purchase/PurchaseInvoiceForm";
import { useGetInvoiceByIdQuery } from "@/redux/services/dashboard/purchase/invoiceApi";

export default function ViewPurchaseInvoicePage() {
  const t = useTranslations("Purchase.Invoice");
  const searchParams = useSearchParams();
  const invoiceId = searchParams.get("id");
  
  const { data: invoiceData, isLoading: isFetching, error } = useGetInvoiceByIdQuery(
    { id: invoiceId! },
    { skip: !invoiceId }
  );

  const [defaultValues, setDefaultValues] = useState<PurchaseInvoiceFormValues | undefined>();

  useEffect(() => {
    if (invoiceData) {
      setDefaultValues({
        voucher_date: invoiceData.voucher_date || "",
        warehouse: invoiceData.warehouse?.id || 0,
        prefix: invoiceData.prefix || "",
        close_kind: invoiceData.close_kind || "",
        due_date: invoiceData.due_date || "",
        branch: invoiceData.branch?.id || 0,
        supplier: invoiceData.supplier?.id || 0,
        purchase_order: invoiceData.purchase_order?.id || 0,
        description: invoiceData.description || "",
        status: invoiceData.status || "pending",
        items: invoiceData.items?.map((item: any) => ({
          item: item.item?.id || 0,
          quantity: item.quantity || 1,
          unit_price: item.unit_price?.toString() || "",
          discount: item.discount?.toString() || "",
          tax: item.tax?.toString() || "",
          total: item.total?.toString() || "",
        })) || [],
      });
    }
  }, [invoiceData]);

  const handleSubmit = async (data: PurchaseInvoiceFormValues) => {
    // This is a view page, so no submission should happen
    console.log("View mode - no submission");
  };

  if (!invoiceId) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">{t("invalidInvoiceId")}</h1>
        </div>
      </div>
    );
  }

  if (isFetching) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">
          <p>{t("loadingInvoice")}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">{t("errorLoadingInvoice")}</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{t("viewInvoice")}</h1>
        <p className="text-gray-600">{t("viewInvoiceDescription")}</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <PurchaseInvoiceForm 
          onSubmit={handleSubmit} 
          defaultValues={defaultValues}
          isView={true}
        />
      </div>
    </div>
  );
}

