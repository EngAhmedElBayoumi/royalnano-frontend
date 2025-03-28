"use client";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { employeeSchema } from "@/lib/validations/dashboard/hr/employeeSchema";
import { useGetBranchesQuery } from "@/redux/services/dashboard/inventory/branchesApi";
import { useGetDepartmentsQuery } from "@/redux/services/dashboard/hr/departmentApi";
import { useGetJobsQuery } from "@/redux/services/dashboard/hr/jobsApi";
import { Form } from "@/components/ui/form";
import CustomButton from "@/components/formFields/CustomButton";
import TextInput from "@/components/formFields/TextInput";
import PhoneInputField from "@/components/formFields/PhoneInputField";
import CustomSelect from "@/components/formFields/CustomSelect";
import SwitchField from "@/components/formFields/Switch";
import { useEffect, useState } from "react";
import MultiSelect from "@/components/formFields/MultiSelect";

interface EmployeeFormProps {
  onSubmit: (data: EmployeeFormValues) => Promise<void>;
  defaultValues?: EmployeeFormValues;
  isLoading?: boolean;
}

export interface EmployeeFormValues {
  name: string;
  email_address: string;
  phone: string;
  job_title: string;
  salary: number;
  address: string;
  branch: string;
  department: string;
  password: string;
  is_user: boolean;
  custom_permissions: number[];
}

const EmployeeForm = ({
  onSubmit,
  defaultValues,
  isLoading,
}: EmployeeFormProps) => {
  const form = useForm({
    resolver: zodResolver(employeeSchema),
    defaultValues: defaultValues || {
      name: "",
      email_address: "",
      phone: "",
      job_title: "",
      salary: 0,
      address: "",
      branch: "",
      department: "",
      password: "",
      is_user: false,
      custom_permissions: [],
    },
  });
  const globalTranslate = useTranslations();
  const t = useTranslations("hr.employees");
  const { data: branches } = useGetBranchesQuery({});
  const { data: departments } = useGetDepartmentsQuery({});
  const { data: jobs } = useGetJobsQuery({});

  const branchesOptions =
    branches?.results?.map((branch: { id: number; name: string }) => ({
      value: String(branch.id),
      label: branch.name,
    })) || [];

  const departmentsOptions =
    departments?.results?.map((department: { id: number; name: string }) => ({
      value: String(department.id),
      label: department.name,
    })) || [];

  const jobsOptions =
    jobs?.results?.map((job: { id: number; name: string }) => ({
      value: String(job.id),
      label: job.name,
    })) || [];

  // Watch the selected job
  const selectedJobId = form.watch("job_title");
  const [jobPermissions, setJobPermissions] = useState<
    { value: string; label: string }[]
  >([]);

  useEffect(() => {
    // Find the selected job and update permissions
    const selectedJob = jobs?.results?.find(
      (job: { id: number }) => String(job.id) === selectedJobId
    );
    if (selectedJob) {
      setJobPermissions(
        selectedJob.permissions.map((p: { id: string; name: string }) => ({
          value: String(p.id),
          label: p.name,
        }))
      );
    } else {
      setJobPermissions([]);
    }
  }, [selectedJobId, jobs]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <section className="grid sm:grid-cols-2 gap-x-4 gap-y-2 xl:gap-y-5 lg:gap-x-10">
          <TextInput
            control={form.control}
            name="name"
            label={t("name")}
            placeholder={t("name")}
          />
          <TextInput
            control={form.control}
            name="email_address"
            label={t("emailAddress")}
            placeholder={t("emailAddress")}
          />
          <PhoneInputField
            control={form.control}
            name="phone"
            label={t("phone")}
          />
          <CustomSelect
            control={form.control}
            name="job_title"
            label={t("jobTitle")}
            placeholder={t("jobTitle")}
            options={jobsOptions}
          />
          <TextInput
            control={form.control}
            name="salary"
            label={t("salary")}
            placeholder={t("salary")}
            type="number"
          />
          <TextInput
            control={form.control}
            name="address"
            label={t("address")}
            placeholder={t("address")}
          />
          <CustomSelect
            control={form.control}
            name="branch"
            label={t("branch")}
            placeholder={t("branch")}
            options={branchesOptions}
          />
          <CustomSelect
            control={form.control}
            name="department"
            label={t("department")}
            placeholder={t("department")}
            options={departmentsOptions}
          />
          <TextInput
            control={form.control}
            name="password"
            label={t("password")}
            placeholder={t("password")}
            type="password"
          />
          <SwitchField
            control={form.control}
            name="is_user"
            label={t("isUser")}
          />
        </section>
        {jobPermissions.length > 0 && (
          <MultiSelect
            control={form.control}
            name="custom_permissions"
            label={t("permissions")}
            placeholder={t("permissions")}
            options={jobPermissions}
          />
        )}

        <section className="flex justify-end gap-2 mt-5">
          <Link
            href={`/dashboard/hr?tab=${globalTranslate("hr.tabs.employees")}`}
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
        </section>
      </form>
    </Form>
  );
};

export default EmployeeForm;
