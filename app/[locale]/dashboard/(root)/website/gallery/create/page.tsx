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
          // Combine the main file and additional files into one array
          const allImages = [data.file, ...(data.additionalFiles || [])].filter(
            (file): file is File => file instanceof File
          );

          // Create a single Blob containing all images
          const imageArrayBlob = new Blob(allImages, {
            type: "application/octet-stream",
          });

          // Append the Blob under a single key
          formData.append("gallery_images", imageArrayBlob);
        } else if (data.item_type === "video") {
          formData.append("video", data.file);
        }
      }

      const response = await createGallery(formData);
      if ("error" in response) {
        throw new Error("Creation failed");
      }
    } catch (error) {
      console.error("Error creating gallery:", error);
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
