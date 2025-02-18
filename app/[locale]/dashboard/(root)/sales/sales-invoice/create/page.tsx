"use client";
import SalesInvoiceForm, { SalesInvoiceFormValues } from "@/components/dashboard/forms/sales/SalesInvoiceForm";
import IconWithTitle from "@/components/dashboard/IconWithTitle";
import CustomModal from "@/components/modals/CustomModal";
import { useRouter } from "@/i18n/routing";
import { useCreateSalesInvoiceMutation } from "@/redux/services/dashboard/salesInvoicesApi";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function CreateSalesInvoice() {

  const router = useRouter();
  const t = useTranslations("Sales");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createSalesInvoice] = useCreateSalesInvoiceMutation();
  const handleModalChange = (isOpen: boolean) => {
    setIsModalOpen(isOpen);
  };

  const handleSubmit = async (data: SalesInvoiceFormValues): Promise<void> => {
    try {
      console.log("submit btn clicked");
      const payload = {
        ...data,
      };
  
      console.log(data);
      const response = await createSalesInvoice(payload);
      console.log("req sent");
      console.log(response);
  
      if ("error" in response) {
        throw new Error("creation failed");
      }
  
      router.push(`/dashboard/sales?tab=${t("sales")}`);
    } catch (error) {
      setIsModalOpen(true);
      console.error("error in creation", error);
    }
  };
  
  return (
    <main className="mx-7 my-5">
      <div className="flex">
        <CustomModal
          isOpen={isModalOpen}
          onChange={handleModalChange}
          title="Error!"
          description="Your Request wasn't processed successfully.."
        />
        <IconWithTitle
          imageSrc="/assets/icons/add.svg"
          title="Add Invoice"
          backgroundColor="#F8F7F7"
          textColor="primary"
        />
      </div>
      <div className="bg-dashboardBg px-6 pt-5 pb-8 ltr:rounded-r-[20px] ltr:rounded-bl-[20px] rtl:rounded-l-[20px] rtl:rounded-br-[20px] ltr:lg:pr-[200px] rtl:lg:pl-[200px]">
        <SalesInvoiceForm onSubmit={handleSubmit} />
        


      </div>
    </main>
  );
}
