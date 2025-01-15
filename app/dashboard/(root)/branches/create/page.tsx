// import { useCreateBranchMutation } from "@/redux/services/BranchApi";
"use client";
import BranchForm, {
  BranchFormValues,
} from "@/components/dashboard/forms/BranchForm";
import IconWithTitle from "@/components/dashboard/IconWithTitle";

export default function CreateBranchs() {
  // const [createBranch] = useCreateBranchMutation();

  const handleSubmit = async (data: BranchFormValues) => {
    console.log(data);
    // await createBranch(data);
  };

  return (
    <main className="mx-7 my-5">
      <div className="flex">
        <IconWithTitle
          imageSrc="/assets/icons/add.svg"
          title="Add Branch"
          backgroundColor="#F8F7F7"
          textColor="primary"
        />
      </div>

      <div className="bg-dashboardBg px-6 pt-5 pb-8 rounded-r-[20px] rounded-bl-[20px] lg:pr-[200px]">
        <BranchForm onSubmit={handleSubmit} />
      </div>
    </main>
  );
}
