"use client";
import { useCreateBlogMutation } from "@/redux/services/website/blogsApi";
import { useTranslations } from "next-intl";
import BlogForm, {
  BlogFormValues,
} from "@/components/dashboard/forms/website/BlogForm";
import CreatePage from "@/components/dashboard/CreatePage";

export default function CreateBlog() {
  const [createBlog, { isLoading }] = useCreateBlogMutation();
  const t = useTranslations("dashboardWebsite.Blogs");

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

      const response = await createBlog(formData);
      if ("error" in response) {
        throw new Error("Creation failed");
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <CreatePage
      title={t("addBlog")}
      onSubmit={handleSubmit}
      Form={BlogForm}
      redirectPath="/dashboard/website"
      isLoading={isLoading}
    />
  );
}
