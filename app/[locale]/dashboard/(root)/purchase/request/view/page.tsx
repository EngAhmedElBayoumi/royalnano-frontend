"use client";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import IconWithTitle from "@/components/dashboard/IconWithTitle";
import FormSkelton from "@/components/dashboard/skelton/FormSkelton";
import LoadingError from "@/components/dashboard/LoadingError";
// import { useGetRequestByIdQuery } from "@/redux/services/dashboard/purchase/requestApi";
import PurchaseRequestForm, {
  PurchaseRequestFormValues,
} from "@/components/dashboard/forms/purchase/PurchaseRequestForm";
import { useGetRequestByIdQuery } from "@/redux/services/dashboard/purchase/requestApi";

export default function ViewRequest() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const t = useTranslations("Purchase.Request");

  const { data, isLoading, error } = useGetRequestByIdQuery(id);
  console.log(data);
  const defaultValues: PurchaseRequestFormValues = data && {
    ...data,
  };

  const handleSubmit = async (data: PurchaseRequestFormValues) => {
    console.log(data);
  };

  return (
    <main className="mx-4 sm:mx-7 my-5">
      <div className="flex">
        <IconWithTitle
          imageSrc="/assets/icons/view.svg"
          title={t("viewPurchaseRequest")}
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
            <PurchaseRequestForm
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
