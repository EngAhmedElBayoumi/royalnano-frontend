"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { format } from "date-fns";
import {
  useUpdateInterviewMutation,
  useGetInterviewByIdQuery,
} from "@/redux/services/dashboard/hr/interviewsApi";
import IconWithTitle from "@/components/dashboard/IconWithTitle";
import CustomModal from "@/components/modals/CustomModal";
import FormSkelton from "@/components/dashboard/skelton/FormSkelton";
import LoadingError from "@/components/dashboard/LoadingError";
import InterviewsForm, {
  InterviewFormValues,
} from "@/components/dashboard/forms/hr/InterviewForm";

export default function EditInterview() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const t = useTranslations("hr");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading, error } = useGetInterviewByIdQuery(id);
  const [updateInterview] = useUpdateInterviewMutation();

  const defaultValues = data && {
    ...data,
    interview_date: new Date(data.interview_date),
    applicant: Number(data.applicant.id),
    interviewers: data.interviewers.map((interviewer: { id: string }) =>
      String(interviewer.id)
    ),
  };

  const handleModalChange = (isOpen: boolean) => {
    setIsModalOpen(isOpen);
  };

  const handleSubmit = async (data: InterviewFormValues) => {
    try {
      const response = await updateInterview({
        id,
        data: {
          ...data,
          interview_date: format(
            data.interview_date,
            "yyyy-MM-dd'T'HH:mm:ss'Z'"
          ),
        },
      });

      if (response.error) throw new Error("edit failed");
      else router.push(`/dashboard/hr?tab=${t("tabs.interviews")}`);
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
          title={t("interviews.editInterview")}
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
          <InterviewsForm
            onSubmit={handleSubmit}
            defaultValues={defaultValues}
          />
        )}
      </div>
    </main>
  );
}
