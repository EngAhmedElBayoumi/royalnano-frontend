"use client";
import CategoryForm, {
  CategoryFormValues,
} from "@/components/dashboard/forms/inventory/CategoryForm";
import IconWithTitle from "@/components/dashboard/IconWithTitle";
import { useGetCategoryByIdQuery, useUpdateCategoryMutation } from "@/redux/services/dashboard/itemCategoryApi";
import {  useRouter, useSearchParams } from "next/navigation";

export default function EditCategory() {
      const router = useRouter();
  
  const [updateCategory] = useUpdateCategoryMutation();
  const searchParams = useSearchParams();
  const id = searchParams.get("id"); 
  console.log("ID:", id);
  const { data: category, isLoading, error } = useGetCategoryByIdQuery(id);

  const defaultValues: CategoryFormValues = {
    name: category?.name || "",
  };

  const handleSubmit = async (data: CategoryFormValues) => {
    try {
      console.log("submit btn clicked");
      const payload = {
        ...data,
      };
      console.log(data);
      const response = await updateCategory({ ...payload, id });
      console.log("req sent");
      console.log(response);
      router.push("/dashboard/inventory"); 

    } catch (error) {
      console.log(error);

    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading category data</div>;

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