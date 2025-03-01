"use client";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { employeeSchema } from "@/lib/validations/dashboard/hr/employeeSchema";
import { useGetBranchesQuery } from "@/redux/services/dashboard/branchesApi";
import { useGetDepartmentsQuery } from "@/redux/services/dashboard/hr/departmentApi";
import { Form } from "@/components/ui/form";
import CustomButton from "@/components/formFields/CustomButton";
import TextInput from "@/components/formFields/TextInput";
import PhoneInputField from "@/components/formFields/PhoneInputField";
import CustomSelect from "@/components/formFields/CustomSelect";
import SwitchField from "@/components/formFields/Switch";

interface EmployeeFormProps {
  onSubmit: (data: EmployeeFormValues) => Promise<void>;
  defaultValues?: EmployeeFormValues;
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
  // permissions: Record<string, boolean>;
}

const EmployeeForm = ({ onSubmit, defaultValues }: EmployeeFormProps) => {
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
      // permissions: {},
    },
  });

  const globalTranslate = useTranslations();
  const t = useTranslations("hr.employees");
  const { data: branches } = useGetBranchesQuery({});
  const { data: departments } = useGetDepartmentsQuery({});

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

  // const permissionOptions = [
  //   "Add service",
  //   "Edit service",
  //   "Delete service",
  //   "View service",
  // ];
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
          <TextInput
            control={form.control}
            name="job_title"
            label={t("jobTitle")}
            placeholder={t("jobTitle")}
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
        {/* <section className="mt-5">
          <h3 className="font-bold text-primary">Permission</h3>
          <div className="grid grid-cols-2 gap-4 mt-2 border border-gray rounded-md xl:rounded-10 p-5 xl:px-6 xl:py-5">
            {permissionOptions.map((permission) => (
              <SwitchField
                key={permission}
                control={form.control}
                name={`permissions.${permission}`}
                label={permission}
              />
            ))}
          </div>
        </section> */}
        <section className="flex justify-end gap-2 mt-5">
          <Link href="/dashboard/hr" passHref>
            <CustomButton
              text={globalTranslate("cancel")}
              className="text-white rounded-lg bg-secondary min-w-[160px] xl:min-w-[222px] font-bold text-sm xl:text-[20px]"
            />
          </Link>

          <CustomButton
            text={globalTranslate("save")}
            className="text-white rounded-lg min-w-[160px] xl:min-w-[222px] font-bold text-sm xl:text-[20px]"
          />
        </section>
      </form>
    </Form>
  );
};

export default EmployeeForm;
