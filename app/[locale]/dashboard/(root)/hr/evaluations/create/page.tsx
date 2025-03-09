"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import EvaluationForm, {
  EvaluationFormValues,
} from "@/components/dashboard/forms/hr/EvaluationForm";
import { useCreateEvaluationMutation } from "@/redux/services/dashboard/hr/evaluationApi";
import CustomModal from "@/components/modals/CustomModal";
import IconWithTitle from "@/components/dashboard/IconWithTitle";

export default function CreateEvaluation() {
  const router = useRouter();
  const t = useTranslations("hr");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createEvaluation] = useCreateEvaluationMutation();

  const handleModalChange = (isOpen: boolean) => {
    setIsModalOpen(isOpen);
  };

  const handleSubmit = async (data: EvaluationFormValues) => {
    try {
      const response = await createEvaluation(data);

      if (response.error) throw new Error("creation failed");
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
          imageSrc="/assets/icons/add.svg"
          title={t("evaluations.addEvaluation")}
          backgroundColor="#F8F7F7"
          textColor="primary"
        />
      </div>
      <div className="bg-dashboardBg px-6 pt-5 pb-8 ltr:rounded-r-[20px] ltr:rounded-bl-[20px] rtl:rounded-l-[20px] rtl:rounded-br-[20px] ltr:lg:pr-[200px] rtl:lg:pl-[200px]">
        <EvaluationForm onSubmit={handleSubmit} />
      </div>
    </main>
  );
}
