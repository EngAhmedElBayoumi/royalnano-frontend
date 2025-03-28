"use client";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { applicantSchema } from "@/lib/validations/dashboard/hr/applicantSchema";
import { Form } from "@/components/ui/form";
import CustomButton from "@/components/formFields/CustomButton";
import TextInput from "@/components/formFields/TextInput";
import DatePicker from "@/components/formFields/DatePicker";
import PhoneInputField from "@/components/formFields/PhoneInputField";

interface ApplicantsFormProps {
  onSubmit: (data: ApplicantsFormValues) => Promise<void>;
  defaultValues?: ApplicantsFormValues;
  isLoading?: boolean;
}

export interface ApplicantsFormValues {
  name: string;
  email: string;
  phone: string;
  address: string;
  birthdate: string;
  expected_salary: number;
  current_job_title: string;
  current_salary: number;
}

const ApplicantsForm = ({
  onSubmit,
  defaultValues,
  isLoading,
}: ApplicantsFormProps) => {
  const form = useForm({
    resolver: zodResolver(applicantSchema),
    defaultValues: defaultValues || {
      name: "",
      email: "",
      phone: "",
      address: "",
      birthdate: "",
      expected_salary: 0,
      current_job_title: "",
      current_salary: 0,
    },
  });

  const globalTranslate = useTranslations();
  const t = useTranslations("hr.applicants");

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
              name="email"
              label={t("email")}
              placeholder={t("email")}
              type="email"
            />
            <PhoneInputField
              control={form.control}
              name="phone"
              label={t("phone")}
            />
            <TextInput
              control={form.control}
              name="address"
              label={t("address")}
              placeholder={t("address")}
            />
            <DatePicker
              control={form.control}
              name="birthdate"
              label={t("birthdate")}
              placeholder={t("birthdate")}
            />
            <TextInput
              control={form.control}
              name="expected_salary"
              label={t("expected_salary")}
              placeholder={t("expected_salary")}
              type="number"
            />
            <TextInput
              control={form.control}
              name="current_job_title"
              label={t("current_job_title")}
              placeholder={t("current_job_title")}
            />
            <TextInput
              control={form.control}
              name="current_salary"
              label={t("current_salary")}
              placeholder={t("current_salary")}
              type="number"
            />
          </div>
        </section>
        <div className="flex justify-end gap-2 mt-5 flex-col-reverse xs:flex-row">
          <Link
            href={`/dashboard/hr?tab=${globalTranslate("hr.tabs.applicants")}`}
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

export default ApplicantsForm;
