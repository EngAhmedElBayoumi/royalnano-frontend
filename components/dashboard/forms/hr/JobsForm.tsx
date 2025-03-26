"use client";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { jobsSchema } from "@/lib/validations/dashboard/hr/jobsSchema";
import { Form } from "@/components/ui/form";
import CustomButton from "@/components/formFields/CustomButton";
import TextInput from "@/components/formFields/TextInput";
import CustomSelect from "@/components/formFields/CustomSelect";
import { useGetPermissionsQuery } from "@/redux/services/dashboard/hr/permissionsApi";

interface JobsFormProps {
  onSubmit: (data: JobsFormValues) => Promise<void>;
  defaultValues?: JobsFormValues;
  isLoading?: boolean;
//   permissionsOptions: { value: string; label: string }[]; 
}

export interface JobsFormValues {
  name: string;
  permissions: number[];
}

const JobsForm: React.FC<JobsFormProps> = ({
    onSubmit,
    defaultValues,
    isLoading,
    // permissionsOptions,
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
  const { 
    data: permissionsData, 
    // isLoading: isLoadingPermissions,
    // error: permissionsError 
  } = useGetPermissionsQuery({});

  // Prepare permissions options for MultiSelect
  const permissionsOptions = permissionsData?.map((permission: { id: { toString: () => string; }; name: string; }) => ({
    value: permission.id.toString(),
    label: permission.name
  })) || [];
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
            
            <CustomSelect
              control={form.control}
              name="permissions"
              label={t("permissions")}
              options={permissionsOptions}
              placeholder={t("permissionSelection")}
              valueType="number"
            />
          </div>
        </section>
        <div className="flex justify-end gap-2 mt-5">
          <Link
            href={`/dashboard/hr?tab=${globalTranslate("hr.tabs.jobs")}`}
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
            type="submit"
            isDisabled={isLoading}
            className="text-white rounded-lg min-w-[160px] xl:min-w-[222px] font-bold text-sm xl:text-[20px]"
          />
        </div>
      </form>
    </Form>
  );
};

export default JobsForm;