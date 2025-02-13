"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCreateMovementMutation } from "@/redux/services/dashboard/movementApi";
import MovementForm, {
  MovementFormValues,
} from "@/components/dashboard/forms/inventory/MovementForm";
import IconWithTitle from "@/components/dashboard/IconWithTitle";
import CustomModal from "@/components/modals/CustomModal";

export default function CreateMovement() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createMovement] = useCreateMovementMutation();

  const handleModalChange = (isOpen: boolean) => {
    setIsModalOpen(isOpen);
  };
  const handleSubmit = async (data: MovementFormValues) => {
    try {
      const payload = {
        ...data,
        item: Number(data.item),
        movement_date: new Date(data.movement_date).toISOString().slice(0, 10),
      };

      const response = await createMovement(payload);

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
