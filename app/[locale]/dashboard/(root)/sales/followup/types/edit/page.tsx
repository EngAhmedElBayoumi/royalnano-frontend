"use client";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { handleApiError } from "@/lib/utils/handleApiError";
import {
  useGetFollowUpTypeByIdQuery,
  useUpdateFollowUpTypeMutation,
} from "@/redux/services/dashboard/sales/followUpTypesApi";
import { FollowUpTypeFormValues } from "@/lib/validations/dashboard/sales/followUp/FollowUpTypesSchema";
import FollowUpTypeForm from "@/components/dashboard/sales/followup/forms/FollowUpTypeForm";
import EditPage from "@/components/dashboard/EditPage";

export default function EditFollowUpType() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const t = useTranslations("follow_up.followUpType");

  const [updateFollowUpType, { isLoading: submitting }] =
    useUpdateFollowUpTypeMutation();
  const { data, isLoading, error } = useGetFollowUpTypeByIdQuery(id);

  const handleSubmit = async (data: FollowUpTypeFormValues) => {
    const response = await updateFollowUpType({ id, data });
    if (response.error) handleApiError(response.error);
  };

  return (
    <EditPage
      title={t("editFollowUpType")}
      data={data}
      isLoading={isLoading}
      error={error}
      submitting={submitting}
      onSubmit={handleSubmit}
      Form={FollowUpTypeForm}
      redirectPath="/dashboard/sales?tab=followup&subtab=follow-up-type"
    />
  );
}
