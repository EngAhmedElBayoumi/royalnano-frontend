"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import EvaluationForm, {
  EvaluationFormValues,
} from "@/components/dashboard/forms/hr/EvaluationForm";
import {
  useGetEvaluationByIdQuery,
  useUpdateEvaluationMutation,
} from "@/redux/services/dashboard/hr/evaluationApi";
import CustomModal from "@/components/modals/CustomModal";
import LoadingError from "@/components/dashboard/LoadingError";
import IconWithTitle from "@/components/dashboard/IconWithTitle";
import FormSkelton from "@/components/dashboard/skelton/FormSkelton";

export default function EditEvaluation() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateEvaluation] = useUpdateEvaluationMutation();
  const { data, isLoading, error } = useGetEvaluationByIdQuery(id);
  const t = useTranslations("hr");

  const defaultValues = data && {
    ...data,
    interview: Number(data.interview.id),
    interviewer: Number(data.interviewer.id),
  };

  const handleModalChange = (isOpen: boolean) => {
    setIsModalOpen(isOpen);
  };

  const handleSubmit = async (data: EvaluationFormValues) => {
    try {
      const response = await updateEvaluation({ id, data });

      if (response.error) throw new Error("edit failed");
      else router.push(`/dashboard/hr?tab=${t("tabs.evaluations")}`);
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
        description="Your Request wasn't processed successfully."
      />
      <div className="flex">
        <IconWithTitle
          imageSrc="/assets/icons/edit.svg"
          title={t("editEvaluation")}
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
          <EvaluationForm
            onSubmit={handleSubmit}
            defaultValues={defaultValues}
          />
        )}
      </div>
    </main>
  );
}
