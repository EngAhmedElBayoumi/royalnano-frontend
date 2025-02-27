"use client";
import SalesQuotationForm, { SalesQuotationFormValues } from "@/components/dashboard/forms/sales/SalesQuotationForm";
import IconWithTitle from "@/components/dashboard/IconWithTitle";
import CustomModal from "@/components/modals/CustomModal";
import { useRouter } from "@/i18n/routing";
import { useCreateSalesQuotationMutation } from "@/redux/services/dashboard/salesQuotationsApi";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function CreateSalesQuotation() {

  const router = useRouter();
  const t = useTranslations("Sales");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createSalesQuotation] = useCreateSalesQuotationMutation();
  const handleModalChange = (isOpen: boolean) => {
    setIsModalOpen(isOpen);
  };

  const handleSubmit = async (data: SalesQuotationFormValues): Promise<void> => {
    console.log(data);
    console.log("submied");
    try {
      console.log("submit btn clicked");
      const payload = {
        ...data,
        // items: data.items.length > 0 ? data.items : [{ item_name: "", quantity: 1, unit_price: 0, discount: "", discount_percent: "", tax_rate: "" }]
      };

      console.log(data);
      const response = await createSalesQuotation(payload);
      console.log("req sent");
      console.log(response);
      if (response.error) {
        throw new Error("creation failed");
      }
      router.push(`/dashboard/sales?tab=${t("sales")}`)
    } catch (error) {
      setIsModalOpen(true);
      console.log(error);
      console.log("error in creation");
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
          title="Add Quotation"
          backgroundColor="#F8F7F7"
          textColor="primary"
        />
      </div>
      <div className="bg-dashboardBg px-6 pt-5 pb-8 ltr:rounded-r-[20px] ltr:rounded-bl-[20px] rtl:rounded-l-[20px] rtl:rounded-br-[20px] ltr:lg:pr-[200px] rtl:lg:pl-[200px]">
        <SalesQuotationForm onSubmit={handleSubmit} />
        


      </div>
    </main>
  );
}
