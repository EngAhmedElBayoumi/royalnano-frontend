"use client";
import SalesInvoiceForm from "@/components/dashboard/forms/sales/SalesInvoiceForm";
import IconWithTitle from "@/components/dashboard/IconWithTitle";
import CustomModal from "@/components/modals/CustomModal";
import { useRouter } from "@/i18n/routing";
import { SalesInvoiceFormValues } from "@/lib/validations/dashboard/sales/salesInvoiceSchema";
import { useCreateSalesInvoiceMutation } from "@/redux/services/dashboard/sales/salesInvoiceApi";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function CreateSalesInvoice() {
  const router = useRouter();
  const t = useTranslations("Sales");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createSalesInvoice] = useCreateSalesInvoiceMutation();

  // Handle modal open/close
  const handleModalChange = (isOpen: boolean) => {
    setIsModalOpen(isOpen);
  };

  // Handle form submission
  const handleSubmit = async (data: SalesInvoiceFormValues): Promise<void> => {
    try {
      console.log("Submit button clicked");
      console.log("Form data:", data);

      const payload = {
        ...data,
      };

      console.log("Payload:", payload);

      // Send the request to create a sales invoice
      const response = await createSalesInvoice(payload);
      console.log("API response:", response);

      if ("error" in response) {
        console.error("API error:", response.error);
        throw new Error("Creation failed");
      }

      console.log("Invoice created successfully");
      router.push(`/dashboard/sales?tab=${t("sales")}`);
    } catch (error) {
      console.error("Error in creation:", error);
      setIsModalOpen(true);
    }
  };

  return (
    <main className="mx-7 my-5">
      <div className="flex">
        {/* Error Modal */}
        <CustomModal
          isOpen={isModalOpen}
          onChange={handleModalChange}
          title="Error!"
          description="Your request wasn't processed successfully. Please try again."
        />

        {/* Page Title */}
        <IconWithTitle
          imageSrc="/assets/icons/add.svg"
          title="Add Invoice"
          backgroundColor="#F8F7F7"
          textColor="primary"
        />
      </div>

      {/* Form Container */}
      <div className="bg-dashboardBg px-6 pt-5 pb-8 ltr:rounded-r-[20px] ltr:rounded-bl-[20px] rtl:rounded-l-[20px] rtl:rounded-br-[20px] ltr:lg:pr-[200px] rtl:lg:pl-[200px]">
        <SalesInvoiceForm onSubmit={handleSubmit} />
      </div>
    </main>
  );
}