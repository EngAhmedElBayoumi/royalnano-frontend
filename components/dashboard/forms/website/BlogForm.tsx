"use client";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { blogSchema } from "@/lib/validations/dashboard/website/blogSchema";
import { ACCEPTED_IMAGE_TYPES } from "@/lib/utils/types";
import { Form } from "@/components/ui/form";
import CustomButton from "@/components/formFields/CustomButton";
import TextInput from "@/components/formFields/TextInput";
import FileInput from "@/components/formFields/FileInput";
import TextArea from "@/components/formFields/TextArea";

interface BlogFormProps {
  onSubmit: (data: BlogFormValues) => Promise<void>;
  defaultValues?: BlogFormValues;
  isLoading?: boolean;
}

export interface BlogFormValues {
  title: string;
  content: string;
  image: File | string | null;
}

const BlogForm = ({ onSubmit, defaultValues, isLoading }: BlogFormProps) => {
  const form = useForm({
    resolver: zodResolver(blogSchema),
    defaultValues: defaultValues || {
      title: "",
      content: "",
      image: null,
    },
  });
  const globalTranslate = useTranslations();
  const t = useTranslations("dashboard_website.Blogs");
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <section className="min-h-[60vh]">
          <div className="grid sm:grid-cols-2 gap-x-4 gap-y-2 xl:gap-y-5 lg:gap-x-10">
            <TextInput
              control={form.control}
              name="title"
              label={t("title")}
              placeholder={t("title")}
            />
          </div>
          <TextArea
            control={form.control}
            name="content"
            label={t("content")}
            placeholder={t("content")}
            className="mt-2 xl:mt-5"
          />
          <FileInput
            control={form.control}
            name="image"
            label={t("image")}
            accepted={ACCEPTED_IMAGE_TYPES.join(",")}
            className="mt-2 xl:mt-5"
          />
        </section>
        <div className="flex justify-end gap-2 mt-5 flex-col-reverse xs:flex-row">
          <Link href="/dashboard/website" passHref>
            <CustomButton
              text={globalTranslate("cancel")}
              variant="secondary"
            />
          </Link>
          <CustomButton
            text={
              isLoading ? globalTranslate("saving") : globalTranslate("save")
            }
            isDisabled={isLoading}
          />
        </div>
      </form>
    </Form>
  );
};

export default BlogForm;
