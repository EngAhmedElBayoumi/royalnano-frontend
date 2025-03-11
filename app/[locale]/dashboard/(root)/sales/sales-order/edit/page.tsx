"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";
import IconWithTitle from "@/components/dashboard/IconWithTitle";
import CustomModal from "@/components/modals/CustomModal";
import FormSkelton from "@/components/dashboard/skelton/FormSkelton";
import LoadingError from "@/components/dashboard/LoadingError";
import EditSalesOrderForm from "@/components/dashboard/forms/sales/EditSalesOrderForm";
import { useGetSalesOrderByIdQuery } from "@/redux/services/dashboard/sales/salesOrderApi";

export default function EditSalesOrder() {
  const searchParams = useSearchParams();
  const idParam = searchParams.get("id");
  const id = idParam ? parseInt(idParam, 10) : null; 

  const t = useTranslations("Sales.SalesOrder");

  const { data: salesOrderData, isLoading, isError } = useGetSalesOrderByIdQuery(id);
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
          title={t("editSalesOrder")}
          backgroundColor="#F8F7F7"
          textColor="primary"
        />
      </div>

      <div className="bg-dashboardBg px-6 pt-5 pb-8 ltr:rounded-r-[20px] ltr:rounded-bl-[20px] rtl:rounded-l-[20px] rtl:rounded-br-[20px]">
        {isLoading ? (
          <div className="ltr:lg:pr-[200px] rtl:lg:pl-[200px]">
            <FormSkelton />
          </div>
        ) : isError ? (
          <LoadingError />
        ) : (
          <div className="ltr:lg:pr-[200px] rtl:lg:pl-[200px]">
            {id !== null && <EditSalesOrderForm salesOrderId={id} defaultValues={salesOrderData} />}
          </div>
        )}
      </div>
    </main>
  );
}