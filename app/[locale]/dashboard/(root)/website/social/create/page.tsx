"use client";
import { useTranslations } from "next-intl";
import { handleApiError } from "@/lib/utils/handleApiError";
import { useCreateSocialMutation } from "@/redux/services/website/socialApi";
import { SocialFormValues } from "@/lib/validations/dashboard/website/socialSchema";
import CreatePage from "@/components/dashboard/CreatePage";
import SocialForm from "@/components/dashboard/forms/website/SocialForm";

export default function CreateSocial() {
  const t = useTranslations("dashboard_website.social");
  const [createSocial, { isLoading }] = useCreateSocialMutation();

  const handleSubmit = async (data: SocialFormValues) => {
    const response = await createSocial(data);
    if (response.error) handleApiError(response.error);
  };

  return (
    <CreatePage
      title={t("add_social")}
      onSubmit={handleSubmit}
      Form={SocialForm}
      redirectPath="/dashboard/website?tab=social"
      isLoading={isLoading}
    />
  );
}
