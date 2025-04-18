"use client";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
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
  const t = useTranslations("dashboardWebsite.Blogs");
  const { data, isLoading, error } = useGetBlogByIdQuery(id);
  const [updateBlog, { isLoading: submitting }] = useUpdateBlogMutation();

  const handleSubmit = async (data: BlogFormValues) => {
    try {
      // Create FormData instance to handle file upload
      const formData = new FormData();

      // Append text fields
      formData.append("title", data.title);
      formData.append("content", data.content);

      // Append image file if it exists
      if (data.image && data.image instanceof File) {
        formData.append("image", data.image);
      }

      const response = await updateBlog({ id, data: formData });
      if ("error" in response) {
        throw new Error("Edit failed");
      }
    } catch (error) {
      console.log("Blog edit error:", error);
      throw error;
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
      redirectPath="/dashboard/website/"
    />
  );
}
