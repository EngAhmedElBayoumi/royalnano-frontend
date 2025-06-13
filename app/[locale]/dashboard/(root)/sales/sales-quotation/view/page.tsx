"use client";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import IconWithTitle from "@/components/dashboard/IconWithTitle";
import FormSkelton from "@/components/dashboard/skelton/FormSkelton";
import LoadingError from "@/components/dashboard/LoadingError";
import EditSalesQuotationForm from "@/components/dashboard/forms/sales/EditSalesQuotationForm";
import { SalesQuotationFormValues } from "@/components/dashboard/forms/sales/AddSalesQuotationForm";
import { useGetSalesQuotationByIdQuery } from "@/redux/services/dashboard/sales/salesQuotationsApi";

export default function ViewSalesQuotations() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const t = useTranslations("Inventory.InventoryMovement");

  const { data, isLoading, error } = useGetSalesQuotationByIdQuery(id);

  const defaultValues: SalesQuotationFormValues = data && {
    ...data,
  };

  const handleSubmit = async (data: SalesQuotationFormValues) => {
    console.log(data);
  };

  return (
    <main className="mx-4 sm:mx-7 my-5">
      <div className="flex">
        <IconWithTitle
          imageSrc="/assets/icons/view.svg"
          title={t("viewMovement")}
          backgroundColor="#F8F7F7"
          textColor="primary"
        />
      </div>

      <div className="bg-[#F8F7F7] px-4 sm:px-6 pt-5 pb-8 ltr:rounded-r-[20px] ltr:rounded-bl-[20px] rtl:rounded-l-[20px] rtl:rounded-br-[20px]">
        {isLoading ? (
          <div className="ltr:lg:pr-[200px] rtl:lg:pl-[200px]">
            <FormSkelton />
          </div>
        ) : error ? (
          <LoadingError />
        ) : (
          <div className="ltr:lg:pr-[200px] rtl:lg:pl-[200px]">
            <EditSalesQuotationForm
              quotationId={Number(id)}
              defaultValues={defaultValues}
              onSubmit={handleSubmit}
              isView={true}
            />
          </div>
        )}
      </div>
    </main>
  );
}
