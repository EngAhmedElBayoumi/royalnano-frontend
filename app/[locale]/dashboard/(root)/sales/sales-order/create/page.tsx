"use client";
import AddSalesOrderForm, { SalesOrderFormValues } from "@/components/dashboard/forms/sales/AddSalesOrderForm";
import IconWithTitle from "@/components/dashboard/IconWithTitle";
import CustomModal from "@/components/modals/CustomModal";
import { useRouter } from "@/i18n/routing";
import { useCreateSalesOrderMutation } from "@/redux/services/dashboard/sales/salesOrderApi";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function CreateSalesOrder() {

  const router = useRouter();
  const t = useTranslations("Sales");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createSalesOrder] = useCreateSalesOrderMutation();
  const handleModalChange = (isOpen: boolean) => {
    setIsModalOpen(isOpen);
  };

  const handleSubmit = async (data: SalesOrderFormValues): Promise<void> => {
    console.log("Form submitted with data:", data);
    try {
      const payload = {
        ...data,
      };
      console.log("Payload being sent to API:", payload);
      const response = await createSalesOrder(payload);
      console.log("Response from API:", response);
      if ("error" in response) {
        console.error("API error:", response.error);
        throw new Error("Creation failed");
      }
      router.push(`/dashboard/sales?tab=${t("order")}`);
    } catch (error) {
      console.error("Error in creation:", error);
      setIsModalOpen(true);
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
          title="Add Sales Order"
          backgroundColor="#F8F7F7"
          textColor="primary"
        />
      </div>
      <div className="bg-dashboardBg px-6 pt-5 pb-8 ltr:rounded-r-[20px] ltr:rounded-bl-[20px] rtl:rounded-l-[20px] rtl:rounded-br-[20px] ltr:lg:pr-[200px] rtl:lg:pl-[200px]">
        <AddSalesOrderForm onSubmit={handleSubmit}/>

      </div>
    </main>
  );
}
