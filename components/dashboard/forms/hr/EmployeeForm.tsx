"use client";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { employeeSchema } from "@/lib/validations/dashboard/hr/employeeSchema";
import CustomButton from "@/components/formFields/CustomButton";
import TextInput from "@/components/formFields/TextInput";
import PhoneInputField from "@/components/formFields/PhoneInputField";
import DatePicker from "@/components/formFields/DatePicker";
import SwitchField from "@/components/formFields/Switch";
import {Link} from '@/i18n/routing';

interface EmployeeFormProps {
  onSubmit: (data: EmployeeFormValues) => Promise<void>;
  defaultValues?: EmployeeFormValues;
}

export interface EmployeeFormValues {
  name: string;
  phone_number: string;
  address: string;
  job_title: string;
  email: string;
  date: Date;
  salary: string;
  permissions: Record<string, boolean>;
}

const EmployeeForm = ({ onSubmit, defaultValues }: EmployeeFormProps) => {
  const form = useForm({
    resolver: zodResolver(employeeSchema),
    defaultValues: defaultValues || {
      name: "",
      phone_number: "",
      address: "",
      job_title: "",
      email: "",
      date: new Date(),
      salary: "",
      permissions: {},
    },
  });

  const permissionOptions = [
    "Add service",
    "Edit service",
    "Delete service",
    "View service",
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <section className="grid sm:grid-cols-2 gap-x-4 gap-y-2 xl:gap-y-5 lg:gap-x-10">
          <TextInput
            control={form.control}
            name="name"
            label="Name"
            placeholder="Name"
          />
          <PhoneInputField
            control={form.control}
            name="phone_number"
            label="Phone Number"
          />
          <TextInput
            control={form.control}
            name="address"
            label="Address"
            placeholder="Address"
          />
          <TextInput
            control={form.control}
            name="job_title"
            label="Job Title"
            placeholder="Job Title"
          />
          <DatePicker
            control={form.control}
            name="date"
            label="Date"
            placeholder="Select Date"
          />
          <TextInput
            control={form.control}
            name="email"
            label="Email"
            placeholder="Email"
          />
          <TextInput
            control={form.control}
            name="salary"
            label="Salary"
            placeholder="Salary"
          />
        </section>
        <section className="mt-5">
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
        </section>
        <section className="flex justify-end gap-2 mt-5">
          <Link href="/dashboard/hr" passHref>
            <CustomButton
              text="Cancel"
              className="text-white rounded-lg bg-secondary min-w-[160px] xl:min-w-[222px] font-bold text-sm xl:text-[20px]"
            />
          </Link>

          <CustomButton
            text="Save"
            className="text-white rounded-lg min-w-[160px] xl:min-w-[222px] font-bold text-sm xl:text-[20px]"
          />
        </section>
      </form>
    </Form>
  );
};

export default EmployeeForm;
