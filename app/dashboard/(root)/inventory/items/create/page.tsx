"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCreateItemMutation } from "@/redux/services/dashboard/itemsApi";
import IconWithTitle from "@/components/dashboard/IconWithTitle";
import ItemForm, {
  ItemFormValues,
} from "@/components/dashboard/forms/inventory/ItemForm";
import CustomModal from "@/components/modals/CustomModal";

export default function CreateItem() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createItem] = useCreateItemMutation();

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

      const response = await createItem(payload);

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
          imageSrc="/assets/icons/add.svg"
          title="Add Item"
          backgroundColor="#F8F7F7"
          textColor="primary"
        />
      </div>

      <div className="bg-dashboardBg px-6 pt-5 pb-8 rounded-r-[20px] rounded-bl-[20px] lg:pr-[200px]">
        <ItemForm onSubmit={handleSubmit} />
      </div>
    </main>
  );
}
