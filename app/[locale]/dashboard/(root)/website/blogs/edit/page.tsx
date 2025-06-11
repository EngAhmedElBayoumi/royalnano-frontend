"use client";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { handleApiError } from "@/lib/utils/handleApiError";
import {
  useGetBlogByIdQuery,
  useUpdateBlogMutation,
} from "@/redux/services/website/blogsApi";
import BlogForm, {
  BlogFormValues,
} from "@/components/dashboard/forms/website/BlogForm";
import EditPage from "@/components/dashboard/EditPage";

export default function EditBlog() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const t = useTranslations("dashboard_website.Blogs");

  const { data, isLoading, error } = useGetBlogByIdQuery(id);
  const [updateBlog, { isLoading: submitting }] = useUpdateBlogMutation();

  const handleSubmit = async (data: BlogFormValues) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("content", data.content);

    if (data.image && data.image instanceof File) {
      formData.append("image", data.image);
    }

    const response = await updateBlog({ id, data: formData });
    if (response.error) {
      handleApiError(response.error);
    }
  };

  return (
    <EditPage
      title={t("editBlog")}
      data={data}
      isLoading={isLoading}
      error={error}
      submitting={submitting}
      onSubmit={handleSubmit}
      Form={BlogForm}
      redirectPath="/dashboard/website?tab=blogs"
    />
  );
}
