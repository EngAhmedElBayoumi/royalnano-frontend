"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  useGetBranchByIdQuery,
  useUpdateBranchMutation,
} from "@/redux/services/dashboard/inventory/branchesApi";
import IconWithTitle from "@/components/dashboard/IconWithTitle";
import { BranchFormValues } from "@/components/dashboard/forms/BranchForm";
import BranchForm from "@/components/dashboard/forms/BranchForm";
import CustomModal from "@/components/modals/CustomModal";
import FormSkelton from "@/components/dashboard/skelton/FormSkelton";
import LoadingError from "@/components/dashboard/LoadingError";

export default function EditBranchs() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const t = useTranslations("branches");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateBranch] = useUpdateBranchMutation();
  const { data, isLoading, error } = useGetBranchByIdQuery(id);
  const defaultValues: BranchFormValues = data;

  const handleModalChange = (isOpen: boolean) => {
    setIsModalOpen(isOpen);
  };

  const handleSubmit = async (data: BranchFormValues) => {
    try {
      const payload = {
        ...data,
        manager: Number(data.manager),
      };

      const response = await updateBranch({ id, data: payload });
      if (response.error) throw new Error("edit failed");
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
          imageSrc="/assets/icons/edit.svg"
          title={t("editBranch")}
          backgroundColor="#F8F7F7"
          textColor="primary"
        />
      </div>

      <div className="bg-dashboardBg px-6 pt-5 pb-8 ltr:rounded-r-[20px] ltr:rounded-bl-[20px] rtl:rounded-l-[20px] rtl:rounded-br-[20px] ltr:lg:pr-[200px] rtl:lg:pl-[200px]">
        {isLoading ? (
          <FormSkelton />
        ) : error ? (
          <LoadingError />
        ) : (
          <BranchForm onSubmit={handleSubmit} defaultValues={defaultValues} />
        )}
      </div>
    </main>
  );
}
