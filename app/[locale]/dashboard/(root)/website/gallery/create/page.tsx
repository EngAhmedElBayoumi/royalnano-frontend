"use client";
import { useCreateGalleryMutation } from "@/redux/services/galleryApi";
import { useTranslations } from "next-intl";
import GalleryForm, {
  GalleryFormValues,
} from "@/components/dashboard/forms/website/GalleryForm";
import CreatePage from "@/components/dashboard/CreatePage";

export default function CreateGallery() {
  const [createGallery] = useCreateGalleryMutation();
  const t = useTranslations("dashboardWebsite");

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

      const response = await createGallery(formData);
      if ("error" in response) {
        throw new Error("Creation failed");
      }
    } catch (error) {
      console.log("Gallery creation error:", error);
      throw error;
    }
  };

  return (
    <CreatePage
      title={t("gallery.addGallery")}
      onSubmit={handleSubmit}
      Form={GalleryForm}
      redirectPath={`/dashboard/website?tab=${t("tabs.gallery")}`}
    />
  );
}
