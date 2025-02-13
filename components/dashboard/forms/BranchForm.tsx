"use client";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { branchSchema } from "@/lib/validations/dashboard/branchSchema";
import CustomButton from "@/components/formFields/CustomButton";
import TextInput from "@/components/formFields/TextInput";
import PhoneInputField from "@/components/formFields/PhoneInputField";
import {Link} from '@/i18n/routing';
import CustomTextArea from "@/components/formFields/TextArea";

interface BranchFormProps {
  onSubmit: (data: BranchFormValues) => Promise<void>;
  defaultValues?: BranchFormValues;
}

export interface BranchFormValues {
  name: string;
  phone_number: string;
  address: string;
  branch_code: string;
  email: string;
  location?: string;
  description?: string;
  manager?: number;
}

const BranchForm = ({ onSubmit, defaultValues }: BranchFormProps) => {
  const form = useForm({
    resolver: zodResolver(branchSchema),
    defaultValues: defaultValues || {
      name: "",
      phone_number: "",
      address: "",
      branch_code: "",
      email: "",
      location: "",
      description: "",
      manager: undefined,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <section className="min-h-[60vh]">
          <div className="grid sm:grid-cols-2 gap-x-4 gap-y-2 xl:gap-y-5 lg:gap-x-10">
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
              name="branch_code"
              label="Branch Code"
              placeholder="Branch Code"
            />
            <TextInput
              control={form.control}
              name="email"
              label="Email"
              placeholder="Email"
            />
            <TextInput
              control={form.control}
              name="location"
              label="Location"
              placeholder="Location"
            />
            <TextInput
              control={form.control}
              name="address"
              label="Address"
              placeholder="Address"
            />
            <TextInput
              control={form.control}
              name="manager"
              label="Manager"
              placeholder="Manager ID"
            />
          </div>
          <CustomTextArea
            control={form.control}
            name="description"
            label="Description"
            placeholder="Description"
            className="mt-2 xl:mt-5"
          />
        </section>
        <div className="flex justify-end gap-2 mt-5">
          <Link href="/dashboard/branches" passHref>
            <CustomButton
              text="Cancel"
              className="text-white rounded-lg bg-secondary min-w-[160px] xl:min-w-[222px] font-bold text-sm xl:text-[20px]"
            />
          </Link>

          <CustomButton
            text="Save"
            className="text-white rounded-lg min-w-[160px] xl:min-w-[222px] font-bold text-sm xl:text-[20px]"
          />
        </div>
      </form>
    </Form>
  );
};

export default BranchForm;
