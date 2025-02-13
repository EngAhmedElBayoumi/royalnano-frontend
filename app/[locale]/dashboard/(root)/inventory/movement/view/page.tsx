"use client";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useGetMovementByIdQuery } from "@/redux/services/dashboard/movementApi";
import MovementForm, {
  MovementFormValues,
} from "@/components/dashboard/forms/inventory/MovementForm";
import IconWithTitle from "@/components/dashboard/IconWithTitle";
import FormSkelton from "@/components/dashboard/skelton/FormSkelton";

export default function EditMovement() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
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
          title="View Movement"
          backgroundColor="#F8F7F7"
          textColor="primary"
        />
      </div>

      <div className="bg-[#F8F7F7] px-6 pt-5 pb-8 rounded-r-[20px] rounded-bl-[20px]">
        {isLoading ? (
          <div className="lg:pr-[200px]">
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
          <div className="lg:pr-[200px]">
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
