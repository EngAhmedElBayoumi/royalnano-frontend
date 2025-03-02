"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  useUpdateEmployeeMutation,
  useGetEmployeeByIdQuery,
} from "@/redux/services/dashboard/hr/employeeApi";
import IconWithTitle from "@/components/dashboard/IconWithTitle";
import CustomModal from "@/components/modals/CustomModal";
import FormSkelton from "@/components/dashboard/skelton/FormSkelton";
import LoadingError from "@/components/dashboard/LoadingError";
import EmployeeForm, {
  EmployeeFormValues,
} from "@/components/dashboard/forms/hr/EmployeeForm";

export default function EditEmployee() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const { data, isLoading, error } = useGetEmployeeByIdQuery(id);
  const [updateEmployee] = useUpdateEmployeeMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const t = useTranslations("hr.employees");

  const defaultValues: EmployeeFormValues = data && {
    ...data,
    salary: Number(data.salary),
    branch: String(data?.branch?.id),
    department: String(data?.department?.id) || "",
    password: "",
  };

  const handleModalChange = (isOpen: boolean) => {
    setIsModalOpen(isOpen);
  };
  const handleSubmit = async (data: EmployeeFormValues) => {
    try {
      const payload = {
        ...data,
        branch: Number(data.branch),
        department: Number(data.department),
      };

      const response = await updateEmployee({ id, data: payload });

      if (response.error) throw new Error("edit failed");
      else router.push("/dashboard/hr");
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
          title={t("editEmployee")}
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
          <EmployeeForm onSubmit={handleSubmit} defaultValues={defaultValues} />
        )}
      </div>
    </main>
  );
}
