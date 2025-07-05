"use client";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { jobsSchema } from "@/lib/validations/dashboard/hr/jobsSchema";
import { Form } from "@/components/ui/form";
import CustomButton from "@/components/formFields/CustomButton";
import TextInput from "@/components/formFields/TextInput";
import GroupedPermissionsSelector from "@/components/formFields/GroupedPermissionsSelector";
import { useGetGroupedPermissionsQuery } from "@/redux/services/dashboard/hr/permissionsApi";

interface JobsFormProps {
  onSubmit: (data: JobsFormValues) => Promise<void>;
  defaultValues?: JobsFormValues;
  isLoading?: boolean;
}

export interface JobsFormValues {
  name: string;
  permissions: number[];
}

const JobsForm: React.FC<JobsFormProps> = ({
  onSubmit,
  defaultValues,
  isLoading,
}) => {
  const form = useForm<JobsFormValues>({
    resolver: zodResolver(jobsSchema),
    defaultValues: defaultValues || {
      name: "",
      permissions: [],
    },
  });

  const globalTranslate = useTranslations();
  const t = useTranslations("hr.jobs");
  const { data: groupedPermissions } = useGetGroupedPermissionsQuery({});

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <section className="min-h-[60vh]">
          <div className="grid gap-x-4 gap-y-2 xl:gap-y-5 lg:gap-x-10">
            <TextInput
              control={form.control}
              name="name"
              label={t("name")}
              placeholder={t("name")}
              className="mb-4"
            />

            <GroupedPermissionsSelector
              control={form.control}
              name="permissions"
              label={t("permissions")}
              groups={groupedPermissions || []}
            />
          </div>
        </section>
        <div className="flex justify-end gap-2 mt-5 flex-col-reverse xs:flex-row">
          <Link href="/dashboard/hr?tab=jobs" passHref>
            <CustomButton
              text={globalTranslate("cancel")}
              variant="secondary"
            />
          </Link>
          <CustomButton
            text={
              isLoading ? globalTranslate("saving") : globalTranslate("save")
            }
            type="submit"
            isDisabled={isLoading}
          />
        </div>
      </form>
    </Form>
  );
};

export default JobsForm;
