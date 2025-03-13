"use client";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  useGetServiceByIdQuery,
  useUpdateServiceMutation,
} from "@/redux/services/website/servicesApi";
import ServiceForm, {
  ServiceFormValues,
} from "@/components/dashboard/forms/website/ServiceForm";
import EditPage from "@/components/dashboard/EditPage";

export default function EditService() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const t = useTranslations("dashboardWebsite.Services");
  const { data, isLoading, error } = useGetServiceByIdQuery(id);
  const [updateService] = useUpdateServiceMutation();

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

      const response = await updateService({ id, data: formData });
      if ("error" in response) {
        throw new Error("Edit failed");
      }
    } catch (error) {
      console.log("Service edit error:", error);
      throw error;
    }
  };

  return (
    <EditPage
      title={t("editService")}
      data={data}
      isLoading={isLoading}
      error={error}
      onSubmit={handleSubmit}
      Form={ServiceForm}
      redirectPath="/dashboard/website/"
    />
  );
}
