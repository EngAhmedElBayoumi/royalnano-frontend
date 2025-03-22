"use client";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { departmentSchema } from "@/lib/validations/dashboard/hr/departmentSchema";
import { Form } from "@/components/ui/form";
import CustomButton from "@/components/formFields/CustomButton";
import TextInput from "@/components/formFields/TextInput";
import useExtraFields from "@/hooks/useExtraFields";
import ExtraFields from "@/components/formFields/ExtraFields";

interface DepartmentFormProps {
  onSubmit: (data: DepartmentFormValues) => Promise<void>;
  defaultValues?: DepartmentFormValues;
  isLoading?: boolean;
}

export interface DepartmentFormValues {
  name: string;
  max_leave_percentage: number;
  extra_fields?: Record<string, string> | null;
}

const DepartmentForm = ({
  onSubmit,
  defaultValues,
  isLoading,
}: DepartmentFormProps) => {
  const form = useForm({
    resolver: zodResolver(departmentSchema),
    defaultValues: defaultValues || {
      name: "",
      max_leave_percentage: 0,
      extra_fields: {},
    },
  });

  const globalTranslate = useTranslations();
  const t = useTranslations("hr.departments");

  const {
    extraFields,
    handleAddExtraField,
    handleRemoveExtraField,
    handleExtraFieldChange,
  } = useExtraFields({
    defaultFields: defaultValues?.extra_fields ?? {},
    setValue: form.setValue,
  });

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
              name="max_leave_percentage"
              label={t("maxLeavePercentage")}
              placeholder={t("maxLeavePercentage")}
              type="number"
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
            href={`/dashboard/hr?tab=${globalTranslate("hr.tabs.departments")}`}
            passHref
          >
            <CustomButton
              text={globalTranslate("cancel")}
              className="text-white rounded-lg bg-secondary min-w-[160px] xl:min-w-[222px] font-bold text-sm xl:text-[20px]"
            />
          </Link>
          <CustomButton
            text={
              isLoading ? globalTranslate("saving") : globalTranslate("save")
            }
            isDisabled={isLoading}
            className="text-white rounded-lg min-w-[160px] xl:min-w-[222px] font-bold text-sm xl:text-[20px]"
          />
        </div>
      </form>
    </Form>
  );
};

export default DepartmentForm;
