"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import CompetitionForm, {
  CompetitionFormValues,
} from "@/components/dashboard/forms/hr/CompetitionForm";
import {
  useGetCompetitionByIdQuery,
  useUpdateCompetitionMutation,
} from "@/redux/services/dashboard/hr/competitionApi";
import IconWithTitle from "@/components/dashboard/IconWithTitle";
import CustomModal from "@/components/modals/CustomModal";
import LoadingError from "@/components/dashboard/LoadingError";
import FormSkelton from "@/components/dashboard/skelton/FormSkelton";

interface EditCompetitionProps {
  params: {
    id: string;
  };
}

const EditCompetition = ({ params: { id } }: EditCompetitionProps) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateCompetition] = useUpdateCompetitionMutation();
  const {
    data: competition,
    isLoading,
    error,
  } = useGetCompetitionByIdQuery(id);
  const t = useTranslations("hr.competitions");

  const handleModalChange = (isOpen: boolean) => {
    setIsModalOpen(isOpen);
  };

  const handleSubmit = async (data: CompetitionFormValues) => {
    try {
      const payload = {
        ...data,
        department: Number(data.department),
        target: Number(data.target),
      };

      const response = await updateCompetition({ id, data: payload });

      if (response.error) throw new Error("edit failed");
      else router.push(`/dashboard/hr?tab=${t("tabs.competitions")}`);
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
          title={t("editCompetition")}
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
          <CompetitionForm
            onSubmit={handleSubmit}
            defaultValues={competition}
          />
        )}
      </div>
    </main>
  );
};

export default EditCompetition;
