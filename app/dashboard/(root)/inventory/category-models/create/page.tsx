"use client";
import CategoryForm, {
  CategoryFormValues,
} from "@/components/dashboard/forms/inventory/CategoryForm";
import IconWithTitle from "@/components/dashboard/IconWithTitle";
// import { useCreateCategoryMutation } from "@/redux/services/InventoryApi";

export default function CreateCategory() {
  // const [createCategory] = useCreateCategoryMutation();

  const handleSubmit = async (data: CategoryFormValues) => {
    console.log(data);
    // await createCategory(data);
  };

  return (
    <main className="mx-7 my-5">
      <div className="flex">
        <IconWithTitle
          imageSrc="/assets/icons/add.svg"
          title="Add Category"
          backgroundColor="#F8F7F7"
          textColor="primary"
        />
      </div>

      <div className="bg-[#F8F7F7] px-6 pt-5 pb-8 rounded-r-[20px] rounded-bl-[20px] lg:pr-[200px]">
        <CategoryForm onSubmit={handleSubmit} />
      </div>
    </main>
  );
}
