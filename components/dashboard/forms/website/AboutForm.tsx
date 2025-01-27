"use client";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ACCEPTED_IMAGE_TYPES } from "@/lib/utils/types";
import { aboutSchema } from "@/lib/validations/dashboard/website/aboutSchema";
import CustomButton from "@/components/formFields/CustomButton";
import TiptapEditor from "@/components/formFields/TiptapEditor";
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
        <FileInput
          control={form.control}
          name="image"
          label="Image"
          accepted={ACCEPTED_IMAGE_TYPES.join(",")}
          className="mt-2 xl:mt-5"
        />
        <TiptapEditor control={form.control} name="description" />
        <CustomButton text="Submit" />
      </form>
    </Form>
  );
};

export default AboutForm;
