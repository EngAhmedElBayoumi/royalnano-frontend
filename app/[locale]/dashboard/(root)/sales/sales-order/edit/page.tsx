"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";
import IconWithTitle from "@/components/dashboard/IconWithTitle";
import CustomModal from "@/components/modals/CustomModal";
import FormSkelton from "@/components/dashboard/skelton/FormSkelton";
import LoadingError from "@/components/dashboard/LoadingError";
import SalesOrderForm from "@/components/dashboard/forms/sales/SalesOrderForm";
import { useGetSalesOrderByIdQuery } from "@/redux/services/dashboard/sales/salesOrderApi";

export default function EditSalesOrder() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const t = useTranslations("Sales.SalesOrder");
  const tabTranslate = useTranslations("Sales");

  const { data, isLoading, error } = useGetSalesOrderByIdQuery(id);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const defaultValues = data && {
    id: data.id,
    order_date: data.order_date,
    customer: data.customer.id,
    branch: data.branch,
    sales_representative: data.sales_representative,
    description: data.description,
    items: data.items.map((item) => ({
      quantity: item.quantity,
      item: item.item?.id || null,
      custom_item_name: item.custom_item_name || "",
      custom_price: item.custom_price || "",
      discount: item.discount,
      discount_percent: item.discount_percent,
    })),
    status: data.status,
  };

  const handleModalChange = (isOpen: boolean) => {
    setIsModalOpen(isOpen);
  };

  const handleSuccess = () => {
    router.push(`/dashboard/sales?tab=${tabTranslate("order")}`);
  };

  return (
    <main className="mx-7 my-5">
      <CustomModal
        isOpen={isModalOpen}
        onChange={handleModalChange}
        title="Error!"
        description="Your request wasn't processed successfully."
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
        ) : error ? (
          <LoadingError />
        ) : (
          <div className="ltr:lg:pr-[200px] rtl:lg:pl-[200px]">
            <SalesOrderForm
              defaultValues={defaultValues}
              onSuccess={handleSuccess}
            />
          </div>
        )}
      </div>
    </main>
  );
}