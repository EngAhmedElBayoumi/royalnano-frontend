"use client";
import PreorderForm, {
  PreorderFormValues,
} from "@/components/dashboard/forms/inventory/PreorderForm";
import IconWithTitle from "@/components/dashboard/IconWithTitle";
import { useUpdatePreorderMutation } from "@/redux/services/dashboard/preorderApi";
import { useParams } from "next/navigation";

export default function EditPreorder() {
  const [updatePreorder] = useUpdatePreorderMutation();
  const defaultValues: PreorderFormValues = {
    preorder_level: 10,
    item: "",
    description: "Sample description",
  };
  const { id } = useParams();

  const handleSubmit = async (data: PreorderFormValues) => {
    try {
      console.log("submit btn clicked");
      const payload = {
        ...data,
        item: Number(data.item),
      };
      console.log(data);
      const response = await updatePreorder({ ...payload, id });
      console.log("req sent");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="mx-7 my-5">
      <div className="flex">
        <IconWithTitle
          imageSrc="/assets/icons/edit.svg"
          title="Edit Preorder"
          backgroundColor="#F8F7F7"
          textColor="primary"
        />
      </div>

      <div className="bg-[#F8F7F7] px-6 pt-5 pb-8 ltr:rounded-r-[20px] ltr:rounded-bl-[20px] rtl:rounded-l-[20px] rtl:rounded-br-[20px] ltr:lg:pr-[200px] rtl:lg:pl-[200px]">
        <PreorderForm onSubmit={handleSubmit} defaultValues={defaultValues} />
      </div>
    </main>
  );
}
