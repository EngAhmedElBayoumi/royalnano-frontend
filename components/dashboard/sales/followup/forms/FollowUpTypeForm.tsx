"use client";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FollowUpTypeFormValues,
  followUpTypeSchema,
} from "@/lib/validations/dashboard/sales/followUp/FollowUpTypesSchema";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import CustomButton from "@/components/formFields/CustomButton";
import TextInput from "@/components/formFields/TextInput";

interface FollowUpTypeFormProps {
  onSubmit: (data: FollowUpTypeFormValues) => Promise<void>;
  defaultValues?: FollowUpTypeFormValues;
  isLoading?: boolean;
}

const FollowUpTypeForm = ({
  onSubmit,
  defaultValues,
  isLoading,
}: FollowUpTypeFormProps) => {
  const form = useForm({
    resolver: zodResolver(followUpTypeSchema),
    defaultValues: defaultValues || {
      name: "",
    },
  });

  const t = useTranslations("follow_up.followUpType");
  const globalTranslate = useTranslations();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <section className="min-h-[60vh]">
          <div className="grid sm:grid-cols-2 gap-x-4 gap-y-2 xl:gap-y-5 lg:gap-x-10">
            <TextInput
              control={form.control}
              name="name"
              label={t("followupName")}
              placeholder={t("followupName")}
            />
          </div>
        </section>
        <div className="flex justify-end gap-2 mt-5 flex-col-reverse xs:flex-row">
          <Link
            href="/dashboard/sales?tab=followup&subtab=follow-up-type"
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

export default FollowUpTypeForm;
