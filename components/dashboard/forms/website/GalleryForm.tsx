"use client";
import { useState, useEffect } from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { gallerySchema } from "@/lib/validations/dashboard/website/gallerySchema";
import { Form } from "@/components/ui/form";
import CustomButton from "@/components/formFields/CustomButton";
import TextInput from "@/components/formFields/TextInput";
import CustomSelect from "@/components/formFields/CustomSelect";
import FileInput from "@/components/formFields/FileInput";

interface GalleryFormProps {
  onSubmit: (data: GalleryFormValues) => Promise<void>;
  defaultValues?: GalleryFormValues;
  isLoading?: boolean;
}
export interface GalleryFormValues {
  title: string;
  item_type: "image" | "video";
  file: File;
}
const GalleryForm = ({
  onSubmit,
  defaultValues,
  isLoading,
}: GalleryFormProps) => {
  const form = useForm<GalleryFormValues>({
    resolver: zodResolver(gallerySchema),
    defaultValues: defaultValues || {
      title: "",
      item_type: "image",
      file: undefined,
    },
  });

  const globalTranslate = useTranslations();
  const t = useTranslations("dashboardWebsite.gallery");

  const itemTypeOptions = [
    { value: "image", label: t("image") },
    { value: "video", label: t("video") },
  ];

  // State to hold accepted file types
  const [acceptedFileTypes, setAcceptedFileTypes] = useState<string>("image/*");

  const itemType = form.watch("item_type");

  // Update accepted file types based on item_type
  useEffect(() => {
    setAcceptedFileTypes(itemType === "image" ? "image/*" : "video/*");
  }, [itemType]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="min-h-[60vh]">
          <div className="grid sm:grid-cols-2 gap-x-4 gap-y-2 xl:gap-y-5 lg:gap-x-10">
            <TextInput
              control={form.control}
              name="title"
              label={t("title")}
              placeholder={t("title")}
            />
            <CustomSelect
              control={form.control}
              name="item_type"
              label={t("item_type")}
              placeholder={t("item_type")}
              options={itemTypeOptions}
            />
          </div>
          <FileInput
            control={form.control}
            name="file"
            label={t("file")}
            accepted={acceptedFileTypes}
            className="mt-2"
          />
        </div>
        <div className="flex justify-end gap-2 mt-5">
          <Link
            href={`/dashboard/website?tab=${globalTranslate(
              "dashboardWebsite.tabs.gallery"
            )}`}
            passHref
          >
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

export default GalleryForm;
