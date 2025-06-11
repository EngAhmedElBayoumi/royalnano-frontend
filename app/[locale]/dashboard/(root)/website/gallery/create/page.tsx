"use client";
import { useTranslations } from "next-intl";
import { handleApiError } from "@/lib/utils/handleApiError";
import { useCreateGalleryMutation } from "@/redux/services/website/galleryApi";
import GalleryForm, {
  GalleryFormValues,
} from "@/components/dashboard/forms/website/GalleryForm";
import CreatePage from "@/components/dashboard/CreatePage";

export default function CreateGallery() {
  const [createGallery, { isLoading }] = useCreateGalleryMutation();
  const t = useTranslations("dashboardWebsite.gallery");

  const handleSubmit = async (data: GalleryFormValues) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("item_type", data.item_type);

    if (data.file && data.file instanceof File) {
      if (data.item_type === "image") {
        // Combine the main file and additional files into one array
        const allImages = [data.file, ...(data.additionalFiles || [])].filter(
          (file): file is File => file instanceof File
        );

        // Append each image directly as binary data under the same key
        allImages.forEach((file) => {
          formData.append("gallery_images", file);
        });
      } else if (data.item_type === "video") {
        formData.append("video", data.file);
      }
    }

    const response = await createGallery(formData);
    if (response.error) handleApiError(response.error);
  };

  return (
    <CreatePage
      title={t("addGallery")}
      onSubmit={handleSubmit}
      Form={GalleryForm}
      isLoading={isLoading}
      redirectPath="/dashboard/website?tab=tabs.gallery"
    />
  );
}
