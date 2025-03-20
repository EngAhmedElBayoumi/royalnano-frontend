"use client";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import MovementForm, {
  MovementFormValues,
} from "@/components/dashboard/forms/inventory/MovementForm";
import IconWithTitle from "@/components/dashboard/IconWithTitle";
import FormSkelton from "@/components/dashboard/skelton/FormSkelton";
import LoadingError from "@/components/dashboard/LoadingError";
import { useGetOrderByIdQuery } from "@/redux/services/dashboard/purchase/orderApi";
import PurchaseOrderForm from "@/components/dashboard/forms/purchase/PurchaseOrderForm";

export default function ViewPurchaseOrder() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const t = useTranslations("Purchase.Order");

  const { data, isLoading, error } = useGetOrderByIdQuery(id);
console.log(data)
  // Transform the API data to match the `MovementFormValues` structure
  const defaultValues: MovementFormValues = data && {
    ...data,
    // item: String(data.item.id), // Ensure `item` is a string
    // Add other transformations if necessary
  };

  // Placeholder for submit function (not needed in view mode)
  const handleSubmit = async (data: MovementFormValues) => {
    console.log(data);
  };

  return (
    <main className="mx-7 my-5">
      <div className="flex">
        <IconWithTitle
          imageSrc="/assets/icons/view.svg"
          title={t("viewPurchaseOrder")}
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
          <LoadingError />
        ) : (
          <div className="ltr:lg:pr-[200px] rtl:lg:pl-[200px]">
            <PurchaseOrderForm
              onSubmit={handleSubmit} // Optional, since this is a view-only page
              defaultValues={defaultValues}
              isView={true} // Disable editing
            />
          </div>
        )}
      </div>
    </main>
  );
}