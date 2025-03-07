"use client";
import { useState } from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { interviewSchema } from "@/lib/validations/dashboard/hr/interviewSchema";
import { useGetEmployeesQuery } from "@/redux/services/dashboard/hr/employeeApi";
import { useGetApplicantsQuery } from "@/redux/services/dashboard/hr/applicantsApi";
import { Form } from "@/components/ui/form";
import CustomButton from "@/components/formFields/CustomButton";
import DateTimePicker from "@/components/formFields/DateTimePicker";
import CustomSelect from "@/components/formFields/CustomSelect";
import MultiSelect from "@/components/formFields/MultiSelect";
import TextInput from "@/components/formFields/TextInput";

interface InterviewFormProps {
  onSubmit: (data: InterviewFormValues) => Promise<void>;
  defaultValues?: InterviewFormValues;
}

export interface InterviewFormValues {
  interviewers: number[];
  interview_date: Date;
  status: string;
  applicant: number;
  extra_fields?: Record<string, string> | null;
}

const InterviewForm = ({ onSubmit, defaultValues }: InterviewFormProps) => {
  const [extraFields, setExtraFields] = useState<
    { key: string; value: string }[]
  >(
    defaultValues?.extra_fields
      ? Object.entries(defaultValues.extra_fields).map(([key, value]) => ({
          key,
          value: String(value),
        }))
      : []
  );
  const form = useForm({
    resolver: zodResolver(interviewSchema),
    defaultValues: defaultValues || {
      interviewers: [],
      interview_date: new Date(),
      status: "scheduled",
      applicant: 0,
      extra_fields: {},
    },
  });

  const globalTranslate = useTranslations();
  const t = useTranslations("hr.interviews");
  const { data: employees } = useGetEmployeesQuery({});
  const { data: applicants } = useGetApplicantsQuery({});

  const employeesOptions =
    employees?.results?.map((employee: { id: number; name: string }) => ({
      value: String(employee.id),
      label: employee.name,
    })) || [];

  const applicantsOptions =
    applicants?.results?.map((applicant: { id: number; name: string }) => ({
      value: String(applicant.id),
      label: applicant.name,
    })) || [];

  const statusOptions = [
    { value: "scheduled", label: t("statuses.scheduled") },
    { value: "completed", label: t("statuses.completed") },
    { value: "rejected", label: t("statuses.rejected") },
  ];

  const handleAddExtraField = () => {
    setExtraFields([...extraFields, { key: "", value: "" }]);
  };

  const handleRemoveExtraField = (index: number) => {
    const newFields = extraFields.filter((_, i) => i !== index);
    setExtraFields(newFields);

    // Update form value
    const extraFieldsObject = newFields.reduce((acc, field) => {
      if (field.key) acc[field.key] = field.value;
      return acc;
    }, {} as Record<string, string>);
    form.setValue("extra_fields", extraFieldsObject);
  };

  const handleExtraFieldChange = (
    index: number,
    type: "key" | "value",
    newValue: string
  ) => {
    const newFields = extraFields.map((field, i) => {
      if (i === index) {
        return { ...field, [type]: newValue };
      }
      return field;
    });
    setExtraFields(newFields);

    // Update form value
    const extraFieldsObject = newFields.reduce((acc, field) => {
      if (field.key) acc[field.key] = field.value;
      return acc;
    }, {} as Record<string, string>);
    form.setValue("extra_fields", extraFieldsObject);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <section className="min-h-[60vh]">
          <div className="grid sm:grid-cols-2 gap-x-4 gap-y-2 xl:gap-y-5 lg:gap-x-10">
            <CustomSelect
              control={form.control}
              name="applicant"
              label={t("applicant")}
              placeholder={t("applicant")}
              options={applicantsOptions}
              valueType="number"
            />
            <MultiSelect
              control={form.control}
              name="interviewers"
              label={t("interviewers")}
              placeholder={t("interviewers")}
              options={employeesOptions}
            />
            <DateTimePicker
              control={form.control}
              name="interview_date"
              label={t("interview_date")}
              placeholder={t("interview_date")}
            />
            <CustomSelect
              control={form.control}
              name="status"
              label={t("status")}
              placeholder={t("status")}
              options={statusOptions}
            />
          </div>
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">
                {globalTranslate("extraFields")}
              </h3>
              <CustomButton
                type="button"
                onClick={handleAddExtraField}
                text={globalTranslate("addField")}
                className="text-white rounded-lg bg-primary px-4 py-2"
              />
            </div>

            {extraFields.map((field, index) => (
              <div
                key={index}
                className="grid grid-cols-2 gap-4 mb-4 items-start"
              >
                <TextInput
                  value={field.key}
                  onChange={(e) =>
                    handleExtraFieldChange(index, "key", e.target.value)
                  }
                  placeholder={globalTranslate("fieldName")}
                  className="w-full"
                />
                <div className="flex gap-2">
                  <TextInput
                    value={field.value}
                    onChange={(e) =>
                      handleExtraFieldChange(index, "value", e.target.value)
                    }
                    placeholder={globalTranslate("fieldValue")}
                    className="w-full"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveExtraField(index)}
                    className="p-2 text-red-500 hover:text-red-700"
                  >
                    {globalTranslate("removeField")}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
        <div className="flex justify-end gap-2 mt-5">
          <Link
            href={`/dashboard/hr?tab=${globalTranslate("hr.tabs.interviews")}`}
            passHref
          >
            <CustomButton
              text={globalTranslate("cancel")}
              className="text-white rounded-lg bg-secondary min-w-[160px] xl:min-w-[222px] font-bold text-sm xl:text-[20px]"
            />
          </Link>
          <CustomButton
            text={globalTranslate("save")}
            className="text-white rounded-lg min-w-[160px] xl:min-w-[222px] font-bold text-sm xl:text-[20px]"
          />
        </div>
      </form>
    </Form>
  );
};

export default InterviewForm;
