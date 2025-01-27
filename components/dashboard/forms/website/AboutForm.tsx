"use client";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ACCEPTED_IMAGE_TYPES } from "@/lib/utils/types";
import { aboutSchema } from "@/lib/validations/dashboard/website/aboutSchema";
import CustomButton from "@/components/formFields/CustomButton";
import TextEditor from "@/components/formFields/TextEditor";
import FileInput from "@/components/formFields/FileInput";

interface AboutFormProps {
  onSubmit: (data: AboutFormValues) => Promise<void>;
  defaultValues?: AboutFormValues;
}
export interface AboutFormValues {
  description: string;
  image: File;
}

const AboutForm = ({ onSubmit, defaultValues }: AboutFormProps) => {
  const form = useForm({
    resolver: zodResolver(aboutSchema),
    defaultValues: defaultValues || {
      image: undefined,
      description: "<p>Hello World!</p>",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <section className="min-h-[60vh] mb-2 xl:mb-5">
          <FileInput
            control={form.control}
            name="image"
            label="Image"
            accepted={ACCEPTED_IMAGE_TYPES.join(",")}
            className="mb-2 xl:mb-5"
          />
          <TextEditor control={form.control} name="description" />
        </section>
        <div className="flex justify-end gap-2 mt-5">
          <CustomButton
            text="Cancel"
            type="reset"
            className="text-white rounded-lg bg-secondary min-w-[160px] xl:min-w-[222px] font-bold text-sm xl:text-[20px]"
          />
          <CustomButton
            text="Save"
            className="text-white rounded-lg min-w-[160px] xl:min-w-[222px] font-bold text-sm xl:text-[20px]"
          />
        </div>
      </form>
    </Form>
  );
};

export default AboutForm;
