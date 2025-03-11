"use client";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ACCEPTED_IMAGE_TYPES } from "@/lib/utils/types";
import { serviceSchema } from "@/lib/validations/dashboard/website/serviceSchema";
import CustomButton from "@/components/formFields/CustomButton";
import TextInput from "@/components/formFields/TextInput";
import FileInput from "@/components/formFields/FileInput";
import { Link } from "@/i18n/routing";
import TextArea from "@/components/formFields/TextArea";

interface ServiceFormProps {
  onSubmit: (data: ServiceFormValues) => Promise<void>;
  defaultValues?: ServiceFormValues;
}

export interface ServiceFormValues {
  name: string;
  alias: string;
  description: string;
  image: File | null;
}

const ServiceForm = ({ onSubmit, defaultValues }: ServiceFormProps) => {
  const form = useForm({
    resolver: zodResolver(serviceSchema),
    defaultValues: defaultValues || {
      name: "",
      alias: "",
      description: "",
      image: null,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <section className="min-h-[60vh]">
          <div className="grid sm:grid-cols-2 gap-x-4 gap-y-2 xl:gap-y-5 lg:gap-x-10">
            <TextInput
              control={form.control}
              name="name"
              label="Service Name"
              placeholder="Service Name"
            />
            <TextInput
              control={form.control}
              name="alias"
              label="Alias"
              placeholder="Service Alias"
            />
          </div>
          <TextArea
            control={form.control}
            name="description"
            label="Description"
            placeholder="Service Description"
            className="mt-2 xl:mt-5"
          />
          <FileInput
            control={form.control}
            name="image"
            label="Image"
            accepted={ACCEPTED_IMAGE_TYPES.join(",")}
            className="mt-2 xl:mt-5"
          />
        </section>
        <div className="flex justify-end gap-2 mt-5">
          <Link href="/dashboard/website" passHref>
            <CustomButton
              text="Cancel"
              className="text-white rounded-lg bg-secondary min-w-[160px] xl:min-w-[222px] font-bold text-sm xl:text-[20px]"
            />
          </Link>
          <CustomButton
            text="Save"
            className="text-white rounded-lg min-w-[160px] xl:min-w-[222px] font-bold text-sm xl:text-[20px]"
          />
        </div>
      </form>
    </Form>
  );
};

export default ServiceForm;
