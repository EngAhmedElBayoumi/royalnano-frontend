"use client";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { serviceSchema } from "@/lib/validations/dashboard/website/serviceSchema";
import { ACCEPTED_IMAGE_TYPES } from "@/lib/utils/types";
import { Form } from "@/components/ui/form";
import CustomButton from "@/components/formFields/CustomButton";
import TextInput from "@/components/formFields/TextInput";
import FileInput from "@/components/formFields/FileInput";
import TextArea from "@/components/formFields/TextArea";

interface ServiceFormProps {
  onSubmit: (data: ServiceFormValues) => Promise<void>;
  defaultValues?: ServiceFormValues;
  isLoading?: boolean;
}

export interface ServiceFormValues {
  name: string;
  alias: string;
  description: string;
  image: File | string | null;
}

const ServiceForm = ({
  onSubmit,
  defaultValues,
  isLoading,
}: ServiceFormProps) => {
  const form = useForm({
    resolver: zodResolver(serviceSchema),
    defaultValues: defaultValues || {
      name: "",
      alias: "",
      description: "",
      image: null,
    },
  });
  const globalTranslate = useTranslations();
  const t = useTranslations("dashboardWebsite.Services");
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <section className="min-h-[60vh]">
          <div className="grid sm:grid-cols-2 gap-x-4 gap-y-2 xl:gap-y-5 lg:gap-x-10">
            <TextInput
              control={form.control}
              name="name"
              label={t("name")}
              placeholder={t("name")}
            />
            <TextInput
              control={form.control}
              name="alias"
              label={t("alias")}
              placeholder={t("alias")}
            />
          </div>
          <TextArea
            control={form.control}
            name="description"
            label={t("description")}
            placeholder={t("description")}
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
        <div className="flex justify-end gap-2 mt-5">
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

export default ServiceForm;
