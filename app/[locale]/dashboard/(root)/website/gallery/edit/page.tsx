"use client";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  useGetGalleryByIdQuery,
  useUpdateGalleryMutation,
} from "@/redux/services/galleryApi";
import GalleryForm, {
  GalleryFormValues,
} from "@/components/dashboard/forms/website/GalleryForm";
import EditPage from "@/components/dashboard/EditPage";

export default function EditGallery() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const t = useTranslations("dashboardWebsite");
  const [updateGallery] = useUpdateGalleryMutation();
  const { data, isLoading, error } = useGetGalleryByIdQuery(id);

  const defaultValues: GalleryFormValues = data && {
    ...data,
    file: data?.image ?? data?.video,
  };

  const handleSubmit = async (data: GalleryFormValues) => {
    try {
      // Create FormData instance to handle file upload
      const formData = new FormData();

      // Append text fields
      formData.append("title", data.title);
      formData.append("item_type", data.item_type);
      if (data.file && data.file instanceof File && data.item_type === "image")
        formData.append("image", data.file);
      if (data.file && data.file instanceof File && data.item_type === "video")
        formData.append("video", data.file);

      const response = await updateGallery({ id, data: formData });
      if ("error" in response) {
        throw new Error("Edit failed");
      }
    } catch (error) {
      console.log("Gallery Edit error:", error);
      throw error;
    }
  };
  return (
    <EditPage
      title={t("gallery.editGallery")}
      data={defaultValues}
      isLoading={isLoading}
      error={error}
      onSubmit={handleSubmit}
      Form={GalleryForm}
      redirectPath={`/dashboard/website?tab=${t("tabs.gallery")}`}
    />
  );
}
