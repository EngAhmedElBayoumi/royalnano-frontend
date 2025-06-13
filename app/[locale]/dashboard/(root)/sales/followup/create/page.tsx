"use client";
import { useTranslations } from "next-intl";
import { handleApiError } from "@/lib/utils/handleApiError";
import { useCreateFollowUpMutation } from "@/redux/services/dashboard/sales/followUpApi";
import { FollowUpFormValues } from "@/lib/validations/dashboard/sales/followUp/FollowUpSchema";
import FollowUpForm from "@/components/dashboard/sales/followup/forms/FollowUpForm";
import CreatePage from "@/components/dashboard/CreatePage";

export default function CreateFollowUp() {
  const t = useTranslations("follow_up");
  const [createFollowUp, { isLoading }] = useCreateFollowUpMutation();

  const handleSubmit = async (data: FollowUpFormValues) => {
    const response = await createFollowUp(data);
    if (response.error) handleApiError(response.error);
  };

  return (
    <CreatePage
      title={t("add_follow_up")}
      onSubmit={handleSubmit}
      Form={FollowUpForm}
      redirectPath="/dashboard/sales?tab=followup&subtab=follow-up-list"
      isLoading={isLoading}
    />
  );
}
