"use client";
import BranchForm from "@/components/dashboard/forms/BranchForm";
import { BranchFormValues } from "@/components/dashboard/forms/BranchForm";
import IconWithTitle from "@/components/dashboard/IconWithTitle";
// import { useUpdateBranchMutation } from "@/redux/services/BranchApi";

export default function EditBranchs() {
  //   const [updateBranch] = useUpdateBranchMutation();
  const defaultValues: BranchFormValues = {
    branch_name: "Cairo",
    address: "new cairo",
    branch_code: "874824",
    email: "cairo_branch@gmail.com",
    branch_manager: "Mr. Hamada",
    phone_number: "0123456789",
  }; // Fetch existing Branch data and set as default values

  const handleSubmit = async (data: BranchFormValues) => {
    console.log(data);
    // await updateBranch(data);
  };

  return (
    <main className="mx-7 my-5">
      <div className="flex">
        <IconWithTitle
          imageSrc="/assets/icons/edit.svg"
          title="Edit Branch"
          backgroundColor="#F8F7F7"
          textColor="primary"
        />
      </div>

      <div className="bg-dashboardBg px-6 pt-5 pb-8 ltr:rounded-r-[20px] ltr:rounded-bl-[20px] rtl:rounded-l-[20px] rtl:rounded-br-[20px] ltr:lg:pr-[200px] rtl:lg:pl-[200px]">
        <BranchForm onSubmit={handleSubmit} defaultValues={defaultValues} />
      </div>
    </main>
  );
}
