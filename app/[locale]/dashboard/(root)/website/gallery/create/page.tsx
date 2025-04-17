"use client";
import { useCreateGalleryMutation } from "@/redux/services/galleryApi";
import { useTranslations } from "next-intl";
import GalleryForm, {
  GalleryFormValues,
} from "@/components/dashboard/forms/website/GalleryForm";
import CreatePage from "@/components/dashboard/CreatePage";

export default function CreateGallery() {
  const [createGallery, { isLoading }] = useCreateGalleryMutation();
  const t = useTranslations("dashboardWebsite");

  const handleSubmit = async (data: GalleryFormValues) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("item_type", data.item_type);

      if (data.file && data.file instanceof File) {
        if (data.item_type === "image") {
          formData.append("gallery_images", data.file);

          // Add additional images if they exist
          if (data.additionalFiles?.length) {
            data.additionalFiles.forEach((file) => {
              if (file instanceof File) {
                formData.append(`gallery_images`, file);
              }
            });
          }
        } else if (data.item_type === "video") {
          formData.append("video", data.file);
        }
      }

      const response = await createGallery(formData);
      if ("error" in response) {
        throw new Error("Creation failed");
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <CreatePage
      title={t("gallery.addGallery")}
      onSubmit={handleSubmit}
      Form={GalleryForm}
      redirectPath={`/dashboard/website?tab=${t("tabs.gallery")}`}
      isLoading={isLoading}
    />
  );
}
