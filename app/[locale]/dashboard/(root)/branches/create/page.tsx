"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCreateBranchMutation } from "@/redux/services/dashboard/branchesApi";
import IconWithTitle from "@/components/dashboard/IconWithTitle";
import CustomModal from "@/components/modals/CustomModal";
import BranchForm, {
  BranchFormValues,
} from "@/components/dashboard/forms/BranchForm";

export default function CreateBranchs() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createBranch] = useCreateBranchMutation();

  const handleModalChange = (isOpen: boolean) => {
    setIsModalOpen(isOpen);
  };

  const handleSubmit = async (data: BranchFormValues) => {
    try {
      const response = await createBranch(data);
      if (response.error) throw new Error("creation failed");
      else router.push("/dashboard/branches");
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
          title="Add Branch"
          backgroundColor="#F8F7F7"
          textColor="primary"
        />
      </div>

      <div className="bg-dashboardBg px-6 pt-5 pb-8 ltr:rounded-r-[20px] ltr:rounded-bl-[20px] rtl:rounded-l-[20px] rtl:rounded-br-[20px] ltr:lg:pr-[200px] rtl:lg:pl-[200px]">
        <BranchForm onSubmit={handleSubmit} />
      </div>
    </main>
  );
}
