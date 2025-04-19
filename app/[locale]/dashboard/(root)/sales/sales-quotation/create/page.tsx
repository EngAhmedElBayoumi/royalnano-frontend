"use client";
import AddSalesQuotationForm from "@/components/dashboard/forms/sales/AddSalesQuotationForm";
import IconWithTitle from "@/components/dashboard/IconWithTitle";
import CustomModal from "@/components/modals/CustomModal";
import { useState } from "react";

export default function CreateSalesQuotation() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalChange = (isOpen: boolean) => {
    setIsModalOpen(isOpen);
  };

  return (
    <main className="mx-4 sm:mx-7 my-5">
      <div className="flex">
        <CustomModal
          isOpen={isModalOpen}
          onChange={handleModalChange}
          title="Error!"
          description="Your Request wasn't processed successfully.."
        />
        <IconWithTitle
          imageSrc="/assets/icons/add.svg"
          title="Add Quotation"
          backgroundColor="#F8F7F7"
          textColor="primary"
        />
      </div>
      <div className="bg-dashboardBg px-4 sm:px-6 pt-5 pb-8 ltr:rounded-r-[20px] ltr:rounded-bl-[20px] rtl:rounded-l-[20px] rtl:rounded-br-[20px] ltr:lg:pr-[200px] rtl:lg:pl-[200px]">
        <AddSalesQuotationForm />
      </div>
    </main>
  );
}
