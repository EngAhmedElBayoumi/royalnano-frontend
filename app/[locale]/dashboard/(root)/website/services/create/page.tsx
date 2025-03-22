"use client";
import { useCreateServiceMutation } from "@/redux/services/website/servicesApi";
import { useTranslations } from "next-intl";
import ServiceForm, {
  ServiceFormValues,
} from "@/components/dashboard/forms/website/ServiceForm";
import CreatePage from "@/components/dashboard/CreatePage";

export default function CreateService() {
  const [createService, { isLoading }] = useCreateServiceMutation();
  const t = useTranslations("dashboardWebsite.Services");

  const handleSubmit = async (data: ServiceFormValues) => {
    try {
      // Create FormData instance to handle file upload
      const formData = new FormData();

      // Append text fields
      formData.append("name", data.name);
      formData.append("alias", data.alias);
      formData.append("description", data.description);

      // Append image file if it exists
      if (data.image && data.image instanceof File) {
        formData.append("image", data.image);
      }

      const response = await createService(formData);
      if ("error" in response) {
        throw new Error("Creation failed");
      }
    } catch (error) {
      console.log("Service creation error:", error);
      throw error;
    }
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
