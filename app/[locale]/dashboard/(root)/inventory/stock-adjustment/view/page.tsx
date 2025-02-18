"use client";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useGetStockAdjustmentByIdQuery } from "@/redux/services/dashboard/stockApi";
import StockAdjustmentForm, {
  StockAdjustmentFormValues,
} from "@/components/dashboard/forms/inventory/StockAdjustmentForm";
import IconWithTitle from "@/components/dashboard/IconWithTitle";
import FormSkelton from "@/components/dashboard/skelton/FormSkelton";

export default function EditStockAdjustment() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const t = useTranslations("Inventory.InventoryStockAdjustment");

  const { data, isLoading, error } = useGetStockAdjustmentByIdQuery(id);

  const defaultValues: StockAdjustmentFormValues = data && {
    ...data,
    item: String(data.item.id),
  };

  const handleSubmit = async (data: StockAdjustmentFormValues) => {
    console.log(data);
  };

  return (
    <main className="mx-7 my-5">
      <div className="flex">
        <IconWithTitle
          imageSrc="/assets/icons/view.svg"
          title={t("viewStockAdjustment")}
          backgroundColor="#F8F7F7"
          textColor="primary"
        />
      </div>

      <div className="bg-[#F8F7F7] px-6 pt-5 pb-8 ltr:rounded-r-[20px] ltr:rounded-bl-[20px] rtl:rounded-l-[20px] rtl:rounded-br-[20px]">
        {isLoading ? (
          <div className="ltr:lg:pr-[200px] rtl:lg:pl-[200px]">
            <FormSkelton />
          </div>
        ) : error ? (
          <div className="flex justify-center flex-col items-center">
            <Image
              src="/assets/icons/dashboard/loading-error.svg"
              alt="loading error"
              width="400"
              height="300"
            />
            Error loading data
          </div>
        ) : (
          <div className="ltr:lg:pr-[200px] rtl:lg:pl-[200px]">
            <StockAdjustmentForm
              onSubmit={handleSubmit}
              defaultValues={defaultValues}
              isView={true}
            />
          </div>
        )}
      </div>
    </main>
  );
}
