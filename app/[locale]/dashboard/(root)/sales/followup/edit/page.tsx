"use client";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { handleApiError } from "@/lib/utils/handleApiError";
import {
  useGetFollowUpByIdQuery,
  useUpdateFollowUpMutation,
} from "@/redux/services/dashboard/sales/followUpApi";
import { FollowUpFormValues } from "@/lib/validations/dashboard/sales/followUp/followUpSchema";
import FollowUpForm from "@/components/dashboard/sales/followup/forms/FollowUpForm";
import EditPage from "@/components/dashboard/EditPage";

export default function EditFollowUp() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const t = useTranslations("follow_up");

  const [updateFollowUp, { isLoading: submitting }] =
    useUpdateFollowUpMutation();
  const { data, isLoading, error } = useGetFollowUpByIdQuery(id);
  const defaultValues = { ...data, action_date: new Date(data?.action_date) };

  const handleSubmit = async (data: FollowUpFormValues) => {
    const response = await updateFollowUp({ id, data });
    if (response.error) handleApiError(response.error);
  };

  return (
    <EditPage
      title={t("edit_follow_up")}
      data={defaultValues}
      isLoading={isLoading}
      error={error}
      submitting={submitting}
      onSubmit={handleSubmit}
      Form={FollowUpForm}
      redirectPath="/dashboard/sales?tab=followup&subtab=follow-up-list"
    />
  );
}
