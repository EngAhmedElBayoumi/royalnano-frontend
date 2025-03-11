"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";
import IconWithTitle from "@/components/dashboard/IconWithTitle";
import CustomModal from "@/components/modals/CustomModal";
import FormSkelton from "@/components/dashboard/skelton/FormSkelton";
import LoadingError from "@/components/dashboard/LoadingError";
import EditSalesQuotationForm from "@/components/dashboard/forms/sales/EditSalesQuotationForm";
import { useGetSalesQuotationByIdQuery } from "@/redux/services/dashboard/sales/salesQuotationsApi";

export default function EditSalesQuotation() {
  const searchParams = useSearchParams();
  const idParam = searchParams.get("id");
  const id = idParam ? parseInt(idParam, 10) : null; // Convert id to number or null

  const t = useTranslations("Sales.SalesQuotation");

  const { isLoading, error } = useGetSalesQuotationByIdQuery(id);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalChange = (isOpen: boolean) => {
    setIsModalOpen(isOpen);
  };

  return (
    <main className="mx-7 my-5">
      <CustomModal
        isOpen={isModalOpen}
        onChange={handleModalChange}
        title="Error!"
        description="Your Request wasn't processed successfully.."
      />
      <div className="flex">
        <IconWithTitle
          imageSrc="/assets/icons/edit.svg"
          title={t("quotation")}
          backgroundColor="#F8F7F7"
          textColor="primary"
        />
      </div>

      <div className="bg-dashboardBg px-6 pt-5 pb-8 ltr:rounded-r-[20px] ltr:rounded-bl-[20px] rtl:rounded-l-[20px] rtl:rounded-br-[20px]">
        {isLoading ? (
          <div className="ltr:lg:pr-[200px] rtl:lg:pl-[200px]">
            <FormSkelton />
          </div>
        ) : error ? (
          <LoadingError />
        ) : (
          <div className="ltr:lg:pr-[200px] rtl:lg:pl-[200px]">
            {id !== null && <EditSalesQuotationForm quotationId={id} />}
          </div>
        )}
      </div>
    </main>
  );
}