"use client";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import PurchaseInvoiceForm, { PurchaseInvoiceFormValues } from "@/components/dashboard/forms/purchase/PurchaseInvoiceForm";
import { useCreateInvoiceMutation } from "@/redux/services/dashboard/purchase/invoiceApi";

export default function CreateInvoicePage() {
  const t = useTranslations("Purchase.Invoice");
  const router = useRouter();
  const [createInvoice, { isLoading }] = useCreateInvoiceMutation();

  const handleSubmit = async (data: PurchaseInvoiceFormValues) => {
    try {
      await createInvoice(data).unwrap();
      toast.success(t("invoiceCreatedSuccessfully"));
      router.push("/dashboard/purchase?tab=invoice");
    } catch (error: any) {
      console.error("Error creating invoice:", error);
      toast.error(error?.data?.message || t("errorCreatingInvoice"));
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{t("createInvoice")}</h1>
        <p className="text-gray-600">{t("createInvoiceDescription")}</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <PurchaseInvoiceForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}

