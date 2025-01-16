"use client";
import MovementForm, {
  MovementFormValues,
} from "@/components/dashboard/forms/inventory/MovementForm";
import IconWithTitle from "@/components/dashboard/IconWithTitle";
// import { useCreateMovementMutation } from "@/redux/services/InventoryApi";

export default function CreateMovement() {
  // const [createMovement] = useCreateMovementMutation();

  const handleSubmit = async (data: MovementFormValues) => {
    console.log(data);
    // await createMovement(data);
  };

  return (
    <main className="mx-7 my-5">
      <div className="flex">
        <IconWithTitle
          imageSrc="/assets/icons/add.svg"
          title="Add Movement"
          backgroundColor="#F8F7F7"
          textColor="primary"
        />
      </div>

      <div className="bg-[#F8F7F7] px-6 pt-5 pb-8 rounded-r-[20px] rounded-bl-[20px] lg:pr-[200px]">
        <MovementForm onSubmit={handleSubmit} />
      </div>
    </main>
  );
}
