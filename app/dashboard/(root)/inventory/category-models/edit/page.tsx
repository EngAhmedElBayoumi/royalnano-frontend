"use client";
import CategoryForm, {
  CategoryFormValues,
} from "@/components/dashboard/forms/inventory/CategoryForm";
import IconWithTitle from "@/components/dashboard/IconWithTitle";
// import { useUpdateCategoryMutation } from "@/redux/services/InventoryApi";

export default function EditCategory() {
  // const [updateCategory] = useUpdateCategoryMutation();
  const defaultValues: CategoryFormValues = {
    categoryName: "Sample Category",
    itemCode: "ITEM123",
    quantity: 10,
  };

  const handleSubmit = async (data: CategoryFormValues) => {
    console.log(data);
    // await updateCategory(data);
  };

  return (
    <main className="mx-7 my-5">
      <div className="flex">
        <IconWithTitle
          imageSrc="/assets/icons/edit.svg"
          title="Edit Category"
          backgroundColor="#F8F7F7"
          textColor="primary"
        />
      </div>

      <div className="bg-dashboardBg px-6 pt-5 pb-8 rounded-r-[20px] rounded-bl-[20px] lg:pr-[200px]">
        <CategoryForm onSubmit={handleSubmit} defaultValues={defaultValues} />
      </div>
    </main>
  );
}
