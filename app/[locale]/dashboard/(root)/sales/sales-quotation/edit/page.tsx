"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";
import IconWithTitle from "@/components/dashboard/IconWithTitle";
import CustomModal from "@/components/modals/CustomModal";
import FormSkelton from "@/components/dashboard/skelton/FormSkelton";
import LoadingError from "@/components/dashboard/LoadingError";
import { useGetSalesQuotationByIdQuery, useUpdateSalesQuotationMutation } from "@/redux/services/dashboard/salesQuotationsApi";
import SalesQuotationForm, { SalesQuotationFormValues } from "@/components/dashboard/forms/sales/SalesQuotationForm";

export default function EditSalesQuotation() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const t = useTranslations("Sales.SalesQuotation");
  const tabTranslate = useTranslations("Sales");

  const [updatePreorder] = useUpdateSalesQuotationMutation();
  const { data, isLoading, error } = useGetSalesQuotationByIdQuery(id);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const defaultValues: SalesQuotationFormValues = data && {
    ...data,
    // item: String(data.item.id),
  };

  const handleModalChange = (isOpen: boolean) => {
    setIsModalOpen(isOpen);
  };

  const handleSubmit = async (data: SalesQuotationFormValues) => {
    try {
      const payload = {
        ...data,
        // item: Number(data.item),
      };
      const response = await updatePreorder({ id, data: payload });

      if (response.error) throw new Error("creation failed");
      else router.push(`/dashboard/inventory?tab=${tabTranslate("preorder")}`);
    } catch (error) {
      setIsModalOpen(true);
      console.log(error);
    }
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
          title={t("editPreorder")}
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
            <SalesQuotationForm
              onSubmit={handleSubmit}
              defaultValues={defaultValues}
            />
          </div>
        )}
      </div>
    </main>
  );
}
