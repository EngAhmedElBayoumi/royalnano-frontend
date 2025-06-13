"use client";
import { useTranslations } from "next-intl";
import { handleApiError } from "@/lib/utils/handleApiError";
import { useCreateServiceMutation } from "@/redux/services/website/servicesApi";
import ServiceForm, {
  ServiceFormValues,
} from "@/components/dashboard/forms/website/ServiceForm";
import CreatePage from "@/components/dashboard/CreatePage";

export default function CreateService() {
  const [createService, { isLoading }] = useCreateServiceMutation();
  const t = useTranslations("dashboard_website.Services");

  const handleSubmit = async (data: ServiceFormValues) => {
    // Create FormData instance to handle file upload
    const formData = new FormData();

    // Append text fields
    formData.append("name", data.name);
    formData.append("alias", data.alias);
    formData.append("is_active", String(data.is_active)); // Convert boolean to string
    formData.append("description", data.description);

    // Append image file if it exists
    if (data.image && data.image instanceof File)
      formData.append("image", data.image);

    const response = await createService(formData);
    if (response.error) handleApiError(response.error);
  };

  return (
    <CreatePage
      title={t("addService")}
      onSubmit={handleSubmit}
      Form={ServiceForm}
      redirectPath="/dashboard/website"
      isLoading={isLoading}
    />
  );
}
