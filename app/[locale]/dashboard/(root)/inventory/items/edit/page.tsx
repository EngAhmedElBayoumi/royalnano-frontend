"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useGetItemByIdQuery,
  useUpdateItemMutation,
} from "@/redux/services/dashboard/itemsApi";
import ItemForm, {
  ItemFormValues,
} from "@/components/dashboard/forms/inventory/ItemForm";
import IconWithTitle from "@/components/dashboard/IconWithTitle";
import CustomModal from "@/components/modals/CustomModal";
import FormSkelton from "@/components/dashboard/skelton/FormSkelton";

export default function EditItem() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [updateItem] = useUpdateItemMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, error } = useGetItemByIdQuery(id);

  const defaultValues: ItemFormValues = data && {
    ...data,
    purchase_price: Number(data.purchase_price),
    selling_price: Number(data.selling_price),
  };

  const handleModalChange = (isOpen: boolean) => {
    setIsModalOpen(isOpen);
  };
  const handleSubmit = async (data: ItemFormValues) => {
    try {
      const payload = {
        ...data,
        category: Number(data.category),
        branch: Number(data.branch),
        supplier: Number(data.supplier),
      };

      const response = await updateItem({ id: id, data: payload });

      if (response.error) throw new Error("creation failed");
      else router.push("/dashboard/inventory");
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
          title="Edit Item"
          backgroundColor="#F8F7F7"
          textColor="primary"
        />
      </div>

      <div className="bg-dashboardBg px-6 pt-5 pb-8 rounded-r-[20px] rounded-bl-[20px]">
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
            <ItemForm onSubmit={handleSubmit} defaultValues={defaultValues} />
          </div>
        )}
      </div>
    </main>
  );
}
