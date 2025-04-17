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
import Image from "next/image";

interface GalleryFormProps {
  onSubmit: (data: GalleryFormValues) => Promise<void>;
  defaultValues?: GalleryFormValues;
  isLoading?: boolean;
}
export interface GalleryFormValues {
  title: string;
  item_type: "image" | "video";
  file: File;
  additionalFiles: File[];
}

const GalleryForm = ({
  onSubmit,
  defaultValues,
  isLoading,
}: GalleryFormProps) => {
  const [fileCount, setFileCount] = useState(1);

  const form = useForm<GalleryFormValues>({
    resolver: zodResolver(gallerySchema),
    defaultValues: defaultValues || {
      title: "",
      item_type: "image",
      file: undefined,
      additionalFiles: [],
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

  const handleAddMoreFiles = () => {
    setFileCount((prev) => prev + 1);
  };

  const handleRemoveFile = (index: number) => {
    const currentFiles = form.getValues("additionalFiles");
    const updatedFiles = currentFiles.filter((_, i) => i !== index);
    form.setValue("additionalFiles", updatedFiles);
    setFileCount((prev) => prev - 1);
  };

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
          <div className="space-y-4 mt-4">
            {/* Main file input */}
            <FileInput
              control={form.control}
              name="file"
              label={t("file")}
              accepted={acceptedFileTypes}
              className="mt-2"
            />

            {/* Additional file inputs */}
            {Array.from({ length: fileCount - 1 }).map((_, index) => (
              <div key={index} className="relative">
                <FileInput
                  control={form.control}
                  name={`additionalFiles.${index}`}
                  accepted={acceptedFileTypes}
                  className="mt-2"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveFile(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2"
                >
                  <Image
                    src="/assets/icons/dashboard/close.svg"
                    alt="remove"
                    width="10"
                    height="10"
                  />
                </button>
              </div>
            ))}

            {/* Add more button */}
            <button
              type="button"
              onClick={handleAddMoreFiles}
              className="flex items-center gap-2 text-primary mt-4"
            >
              <Image
                src="/assets/icons/dashboard/plus.svg"
                alt="add"
                width="20"
                height="20"
              />
              {t("addMore")}
            </button>
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-5 flex-col-reverse xs:flex-row">
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
