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
      <form onSubmit={form.handleSubmit(onSubmit)}></form>
    </Form>
  );
};

export default SocialForm;
