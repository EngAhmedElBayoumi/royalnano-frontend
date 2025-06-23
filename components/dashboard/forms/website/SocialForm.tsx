"use client";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SocialFormValues,
  socialSchema,
} from "@/lib/validations/dashboard/website/socialSchema";
import { Form } from "@/components/ui/form";
import CustomButton from "@/components/formFields/CustomButton";
import TextInput from "@/components/formFields/TextInput";
import TextArea from "@/components/formFields/TextArea";

interface SocialFormProps {
  onSubmit: (data: SocialFormValues) => Promise<void>;
  defaultValues?: SocialFormValues;
  isLoading?: boolean;
}

const SocialForm = ({
  onSubmit,
  defaultValues,
  isLoading,
}: SocialFormProps) => {
  const form = useForm({
    resolver: zodResolver(socialSchema),
    defaultValues: defaultValues || {
      code: "",
      description: "",
    },
  });
  const globalTranslate = useTranslations();
  const t = useTranslations("dashboard_website.social");
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <section className="min-h-[60vh]">
          <div className="grid gap-x-4 gap-y-2 xl:gap-y-5 lg:gap-x-10">
            <TextInput
              control={form.control}
              name="code"
              label={t("code")}
              placeholder={t("code")}
            />
            <TextArea
              control={form.control}
              name="description"
              label={t("description")}
              placeholder={t("description")}
            />
          </div>
        </section>
        <div className="flex justify-end gap-2 mt-5 flex-col-reverse xs:flex-row">
          <Link href="/dashboard/website?tab=social" passHref>
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

export default SocialForm;
