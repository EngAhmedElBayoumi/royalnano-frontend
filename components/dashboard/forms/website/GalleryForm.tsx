"use client";
import { useState, useEffect } from "react";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { gallerySchema } from "@/lib/validations/dashboard/website/gallerySchema";
import CustomButton from "@/components/formFields/CustomButton";
import TextInput from "@/components/formFields/TextInput";
import CustomSelect from "@/components/formFields/CustomSelect";
import FileInput from "@/components/formFields/FileInput";

interface GalleryFormProps {
  onSubmit: (data: GalleryFormValues) => Promise<void>;
  defaultValues?: GalleryFormValues;
}
export interface GalleryFormValues {
  title: string;
  item_type: "image" | "video";
  file: File;
}
const GalleryForm = ({ onSubmit, defaultValues }: GalleryFormProps) => {
  const form = useForm<GalleryFormValues>({
    resolver: zodResolver(gallerySchema),
    defaultValues: defaultValues || {
      title: "",
      item_type: "image",
      file: undefined,
    },
  });

  const itemTypeOptions = [
    { value: "image", label: "Image" },
    { value: "video", label: "Video" },
  ];

  // State to hold accepted file types
  const [acceptedFileTypes, setAcceptedFileTypes] = useState<string>("image/*");

  // Update accepted file types based on item_type
  useEffect(() => {
    const itemType = form.watch("item_type");
    setAcceptedFileTypes(itemType === "image" ? "image/*" : "video/*");
  }, [form.watch("item_type")]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="min-h-[60vh]">
          <div className="grid sm:grid-cols-2 gap-x-4 gap-y-2 xl:gap-y-5 lg:gap-x-10">
            <TextInput
              control={form.control}
              name="title"
              label="Title"
              placeholder="Enter title"
            />
            <CustomSelect
              control={form.control}
              name="item_type"
              label="Item Type"
              placeholder="Select item type"
              options={itemTypeOptions}
            />
          </div>
          <FileInput
            control={form.control}
            name="file"
            label="File"
            accepted={acceptedFileTypes}
            className="mt-2"
          />
        </div>
        <div className="flex justify-end gap-2 mt-5">
          <CustomButton
            text="Cancel"
            type="reset"
            className="text-white rounded-lg bg-secondary min-w-[160px] font-bold text-sm"
          />
          <CustomButton
            text="Submit"
            className="text-white rounded-lg min-w-[160px] font-bold text-sm"
          />
        </div>
      </form>
    </Form>
  );
};

export default GalleryForm;
