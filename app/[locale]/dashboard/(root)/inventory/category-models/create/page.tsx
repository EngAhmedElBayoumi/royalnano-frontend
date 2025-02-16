"use client";
import CategoryForm, {
  CategoryFormValues,
} from "@/components/dashboard/forms/inventory/CategoryForm";
import IconWithTitle from "@/components/dashboard/IconWithTitle";
import CustomModal from "@/components/modals/CustomModal";
import { useCreateCategoryMutation } from "@/redux/services/dashboard/itemCategoryApi";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function CreateCategory() {
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createCategory] = useCreateCategoryMutation();

  const t = useTranslations("Add.Inventory");
  const tabTranslate = useTranslations("Inventory");

  const handleModalChange = (isOpen: boolean) => {
    setIsModalOpen(isOpen);
  };

  const handleSubmit = async (data: CategoryFormValues) => {
    try {
      const payload = {
        ...data,
      };
      const response = await createCategory(payload);

      if (response.error) {
        throw new Error("creation failed");
      } else
        router.push(
          `/dashboard/inventory?tab=${tabTranslate("categoryModel")}`
        );
    } catch (error) {
      setIsModalOpen(true);
      console.log(error);
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
          title={t("categoryModel")}
          backgroundColor="#F8F7F7"
          textColor="primary"
        />
      </div>

      <div className="bg-dashboardBg px-6 pt-5 pb-8 ltr:rounded-r-[20px] ltr:rounded-bl-[20px] rtl:rounded-l-[20px] rtl:rounded-br-[20px] ltr:lg:pr-[200px] rtl:lg:pl-[200px]">
        <CategoryForm onSubmit={handleSubmit} />
      </div>
    </main>
  );
}
