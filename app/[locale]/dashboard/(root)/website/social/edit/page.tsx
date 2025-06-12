"use client";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { handleApiError } from "@/lib/utils/handleApiError";
import {
  useGetSocialByIdQuery,
  useUpdateSocialMutation,
} from "@/redux/services/website/socialApi";
import { SocialFormValues } from "@/lib/validations/dashboard/website/socialSchema";
import EditPage from "@/components/dashboard/EditPage";
import SocialForm from "@/components/dashboard/forms/website/SocialForm";
import { extractChangedFields } from "@/lib/utils/extractChangedFields";

export default function EditSocial() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const t = useTranslations("dashboard_website.social");

  const { data: defaultValues, isLoading, error } = useGetSocialByIdQuery(id);
  const [updateSocial, { isLoading: submitting }] = useUpdateSocialMutation();

  const handleSubmit = async (data: SocialFormValues) => {
    const changedData = extractChangedFields(data, defaultValues);

    const response = await updateSocial({ id, data: changedData });
    if (response.error) handleApiError(response.error);
  };

  return (
    <EditPage
      title={t("editSocial")}
      data={defaultValues}
      isLoading={isLoading}
      submitting={submitting}
      error={error}
      onSubmit={handleSubmit}
      Form={SocialForm}
      redirectPath="/dashboard/website"
    />
  );
}
