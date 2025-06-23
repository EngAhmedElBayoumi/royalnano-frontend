"use client";
import { useTranslations } from "next-intl";
import { handleApiError } from "@/lib/utils/handleApiError";
import { useCreateFollowUpTypeMutation } from "@/redux/services/dashboard/sales/followUpTypesApi";
import { FollowUpTypeFormValues } from "@/lib/validations/dashboard/sales/followUp/FollowUpTypesSchema";
import FollowUpTypeForm from "@/components/dashboard/sales/followup/forms/FollowUpTypeForm";
import CreatePage from "@/components/dashboard/CreatePage";

export default function CreateFollowUpType() {
  const t = useTranslations("follow_up.followUpType");
  const [createFollowUpType, { isLoading }] = useCreateFollowUpTypeMutation();

  const handleSubmit = async (data: FollowUpTypeFormValues) => {
    const response = await createFollowUpType(data);
    if (response.error) handleApiError(response.error);
  };

  return (
    <CreatePage
      title={t("addFollowUpType")}
      onSubmit={handleSubmit}
      Form={FollowUpTypeForm}
      redirectPath="/dashboard/sales?tab=followup&subtab=follow-up-type"
      isLoading={isLoading}
    />
  );
}
