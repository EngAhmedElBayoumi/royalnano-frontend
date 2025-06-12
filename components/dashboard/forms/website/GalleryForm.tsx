"use client";
import { useState, useEffect } from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useForm, useFieldArray } from "react-hook-form";
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
  file: File | string;
  additionalFiles: (File | string)[];
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
      additionalFiles: [],
    },
  });
  console.log(defaultValues?.additionalFiles);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    // ts-ignore-next-line
    // @ts-expect-error: additionalFiles is not recognized as a field in the form
    name: "additionalFiles",
  });

  const globalTranslate = useTranslations();
  const t = useTranslations("dashboard_website.gallery");

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
          <div className="space-y-4 mt-4">
            {/* Main file input */}
            <FileInput
              control={form.control}
              name="file"
              label={t("file")}
              accepted={acceptedFileTypes}
              className="mt-2"
            />

            {/* Show additional files section only for images */}
            {itemType === "image" && (
              <>
                {/* Additional file inputs */}
                {fields.map((field, index) => (
                  <div key={field.id} className="relative">
                    <FileInput
                      control={form.control}
                      name={`additionalFiles.${index}`}
                      accepted={acceptedFileTypes}
                      label={t("file")}
                    />
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="absolute -top-1 right-1 bg-red-500 rounded-full p-2"
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
                  onClick={() => append({})}
                  className="flex items-center justify-center gap-2 text-primary mt-4 w-20 h-20 bg-white rounded-md border border-dashed border-primary hover:bg-primary hover:text-white transition duration-200 ease-in-out"
                >
                  +
                </button>
              </>
            )}
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-5 flex-col-reverse xs:flex-row">
          <Link href="/dashboard/website?tab=gallery" passHref>
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
