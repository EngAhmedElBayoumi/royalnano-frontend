"use client";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useGetMovementByIdQuery } from "@/redux/services/dashboard/inventory/movementApi";
import MovementForm, {
  MovementFormValues,
} from "@/components/dashboard/forms/inventory/MovementForm";
import IconWithTitle from "@/components/dashboard/IconWithTitle";
import FormSkelton from "@/components/dashboard/skelton/FormSkelton";
import LoadingError from "@/components/dashboard/LoadingError";

export default function EditMovement() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const t = useTranslations("Inventory.InventoryMovement");

  const { data, isLoading, error } = useGetMovementByIdQuery(id);

  const defaultValues: MovementFormValues = data && {
    ...data,
    item: String(data.item.id),
  };

  const handleSubmit = async (data: MovementFormValues) => {
    console.log(data);
  };

  return (
    <main className="mx-7 my-5">
      <div className="flex">
        <IconWithTitle
          imageSrc="/assets/icons/view.svg"
          title={t("viewMovement")}
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
            <MovementForm
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
