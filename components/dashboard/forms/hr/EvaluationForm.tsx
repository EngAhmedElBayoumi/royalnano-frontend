"use client";
import { Link } from "@/i18n/routing";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { evaluationSchema } from "@/lib/validations/dashboard/hr/evaluationSchema";
import { useGetInterviewsQuery } from "@/redux/services/dashboard/hr/interviewsApi";
import { useGetEmployeesQuery } from "@/redux/services/dashboard/hr/employeeApi";
import { Form } from "@/components/ui/form";
import CustomButton from "@/components/formFields/CustomButton";
import CustomTextArea from "@/components/formFields/TextArea";
import TextInput from "@/components/formFields/TextInput";
import CustomSelect from "@/components/formFields/CustomSelect";
import ExtraFields from "@/components/formFields/ExtraFields";
import useExtraFields from "@/hooks/useExtraFields";

interface EvaluationFormProps {
  onSubmit: (data: EvaluationFormValues) => Promise<void>;
  defaultValues?: EvaluationFormValues;
  isLoading?: boolean;
}

export interface EvaluationFormValues {
  score: number;
  comments?: string;
  extra_fields?: Record<string, string>;
  interview: string;
  interviewer: string;
}

const EvaluationForm = ({
  onSubmit,
  defaultValues,
  isLoading,
}: EvaluationFormProps) => {
  const form = useForm({
    resolver: zodResolver(evaluationSchema),
    defaultValues: defaultValues || {
      score: 0,
      comments: "",
      extra_fields: {},
      interview: "",
      interviewer: "",
    },
  });

  const globalTranslate = useTranslations();
  const t = useTranslations("hr.evaluations");

  const { data: interviews } = useGetInterviewsQuery({});
  const { data: employees } = useGetEmployeesQuery({});

  const interviewOptions =
    interviews?.results?.map(
      (interview: { id: number; applicant: { name: string } }) => ({
        value: String(interview.id),
        label: interview.applicant.name,
      })
    ) || [];

  const interviewerOptions =
    employees?.results?.map((employee: { id: number; name: string }) => ({
      value: String(employee.id),
      label: employee.name,
    })) || [];

  const {
    extraFields,
    handleAddExtraField,
    handleRemoveExtraField,
    handleExtraFieldChange,
  } = useExtraFields({
    defaultFields: defaultValues?.extra_fields,
    setValue: form.setValue,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <section className="min-h-[60vh]">
          <div className="grid sm:grid-cols-2 gap-x-4 gap-y-2 xl:gap-y-5 lg:gap-x-10">
            <CustomSelect
              control={form.control}
              name="interview"
              label={t("interview")}
              placeholder={t("selectInterview")}
              options={interviewOptions}
            />
            <CustomSelect
              control={form.control}
              name="interviewer"
              label={t("interviewer")}
              placeholder={t("selectInterviewer")}
              options={interviewerOptions}
            />
            <TextInput
              control={form.control}
              name="score"
              label={t("score")}
              placeholder={t("scorePlaceholder")}
              type="number"
            />
            <CustomTextArea
              control={form.control}
              name="comments"
              label={t("comments")}
              placeholder={t("commentsPlaceholder")}
            />
          </div>
          <ExtraFields
            extraFields={extraFields}
            onAddField={handleAddExtraField}
            onRemoveField={handleRemoveExtraField}
            onFieldChange={handleExtraFieldChange}
          />
        </section>
        <div className="flex justify-end gap-2 mt-5 flex-col-reverse xs:flex-row">
          <Link href="/dashboard/hr?tab=evaluations" passHref>
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

export default EvaluationForm;
