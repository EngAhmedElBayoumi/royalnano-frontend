"use client";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { handleApiError } from "@/lib/utils/handleApiError";
import {
  useGetGalleryByIdQuery,
  useUpdateGalleryMutation,
} from "@/redux/services/website/galleryApi";
import GalleryForm, {
  GalleryFormValues,
} from "@/components/dashboard/forms/website/GalleryForm";
import EditPage from "@/components/dashboard/EditPage";

export default function EditGallery() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const t = useTranslations("dashboard_website.gallery");

  const [updateGallery, { isLoading: submitting }] = useUpdateGalleryMutation();
  const { data, isLoading, error } = useGetGalleryByIdQuery(id);

  const defaultValues: GalleryFormValues = data && {
    ...data,
    file: data?.gallery_images?.[0]?.image ?? data?.video,
    additionalFiles:
      data?.gallery_images
        ?.slice(1)
        .map((image: { image: string }) => image.image) || [],
  };

  const handleSubmit = async (data: GalleryFormValues) => {
    const formData = new FormData();

    formData.append("title", data.title);
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

    const response = await updateGallery({ id, data: formData });
    if (response.error) handleApiError(response.error);
  };
  return (
    <EditPage
      title={t("editGallery")}
      data={defaultValues}
      submitting={submitting}
      isLoading={isLoading}
      error={error}
      onSubmit={handleSubmit}
      Form={GalleryForm}
      redirectPath="/dashboard/website?tab=tabs.gallery"
    />
  );
}
