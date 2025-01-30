"use client";
import PreorderForm, {
  PreorderFormValues,
} from "@/components/dashboard/forms/inventory/PreorderForm";
import IconWithTitle from "@/components/dashboard/IconWithTitle";
// import { useCreatePreorderMutation } from "@/redux/services/InventoryApi";

export default function CreatePreorder() {

  // const [createPreorder] = useCreatePreorderMutation();

  const handleSubmit = async (data: PreorderFormValues) => {
    console.log(data);
    // await createPreorder(data);
  };


  return (
    <main className="mx-7 my-5">
      <div className="flex">
        <IconWithTitle
          imageSrc="/assets/icons/add.svg"
          title="Add Preorder"
          backgroundColor="#F8F7F7"
          textColor="primary"
        />
      </div>

      <div className="bg-[#F8F7F7] px-6 pt-5 pb-8 rounded-r-[20px] rounded-bl-[20px] lg:pr-[200px]">
        <PreorderForm onSubmit={handleSubmit} />
      </div>
    </main>
  );
}
