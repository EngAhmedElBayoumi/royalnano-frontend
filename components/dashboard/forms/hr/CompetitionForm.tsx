"use client";
import { Link } from "@/i18n/routing";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { competitionSchema } from "@/lib/validations/dashboard/hr/competitionSchema";
import { useGetDepartmentsQuery } from "@/redux/services/dashboard/hr/departmentApi";
import { useGetEmployeesQuery } from "@/redux/services/dashboard/hr/employeeApi";
import { Form } from "@/components/ui/form";
import CustomButton from "@/components/formFields/CustomButton";
import TextInput from "@/components/formFields/TextInput";
import DatePicker from "@/components/formFields/DatePicker";
import CustomSelect from "@/components/formFields/CustomSelect";
import ExtraFields from "@/components/formFields/ExtraFields";
import useExtraFields from "@/hooks/useExtraFields";

interface CompetitionFormProps {
  onSubmit: (data: CompetitionFormValues) => Promise<void>;
  defaultValues?: CompetitionFormValues;
  isLoading?: boolean;
}

export interface CompetitionFormValues {
  department: number;
  winner?: number;
  target: number;
  reward: number;
  start_date: string;
  end_date: string;
  extra_fields?: Record<string, string>;
}

const CompetitionForm = ({
  onSubmit,
  defaultValues,
  isLoading,
}: CompetitionFormProps) => {
  const form = useForm({
    resolver: zodResolver(competitionSchema),
    defaultValues: defaultValues || {
      department: 0,
      target: 0,
      reward: 0,
      start_date: "",
      end_date: "",
      extra_fields: {},
    },
  });

  const globalTranslate = useTranslations();
  const t = useTranslations("hr.competitions");
  const { data: departments } = useGetDepartmentsQuery({});
  const { data: employees } = useGetEmployeesQuery({});

  const employeesOptions =
    employees?.results?.map((employee: { id: number; name: string }) => ({
      value: String(employee.id),
      label: employee.name,
    })) || [];

  const departmentsOptions =
    departments?.results?.map((department: { id: number; name: string }) => ({
      value: String(department.id),
      label: department.name,
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
              name="department"
              label={t("department")}
              placeholder={t("department")}
              options={departmentsOptions}
              valueType="number"
            />
            <TextInput
              control={form.control}
              name="target"
              label={t("target")}
              placeholder={t("target")}
              type="number"
            />
            <TextInput
              control={form.control}
              name="reward"
              label={t("reward")}
              placeholder={t("reward")}
              type="number"
            />
            <DatePicker
              control={form.control}
              name="start_date"
              label={t("startDate")}
              placeholder={t("startDate")}
            />
            <DatePicker
              control={form.control}
              name="end_date"
              label={t("endDate")}
              placeholder={t("endDate")}
            />
            <CustomSelect
              control={form.control}
              name="winner"
              label={t("winner")}
              placeholder={t("winner")}
              options={employeesOptions}
              valueType="number"
            />
          </div>
          <ExtraFields
            extraFields={extraFields}
            onAddField={handleAddExtraField}
            onRemoveField={handleRemoveExtraField}
            onFieldChange={handleExtraFieldChange}
          />
        </section>
        <div className="flex justify-end gap-2 mt-5">
          <Link
            href={`/dashboard/hr?tab=${globalTranslate(
              "hr.tabs.competitions"
            )}`}
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

export default CompetitionForm;
