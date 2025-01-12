"use client";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { branchSchema } from "@/lib/validations/dashboard/branchSchema";
import CustomButton from "@/components/formFields/CustomButton";
import TextInput from "@/components/formFields/TextInput";
import PhoneInputField from "@/components/formFields/PhoneInputField";
import Link from "next/link";

interface BranchFormProps {
  onSubmit: (data: BranchFormValues) => Promise<void>;
  defaultValues?: BranchFormValues;
}

export interface BranchFormValues {
  branch_name: string;
  phone_number: string;
  address: string;
  branch_code: string;
  email: string;
  branch_manager: string;
}

const BranchForm = ({ onSubmit, defaultValues }: BranchFormProps) => {
  const form = useForm({
    resolver: zodResolver(branchSchema),
    defaultValues: defaultValues || {
      branch_name: "",
      phone_number: "",
      address: "",
      branch_code: "",
      email: "",
      branch_manager: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid sm:grid-cols-2 gap-x-4 gap-y-2 xl:gap-y-5 lg:gap-x-10">
          <TextInput
            control={form.control}
            name="branch_name"
            label="Branch Name"
            placeholder="Branch Name"
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
            name="branch_manager"
            label="Branch Manager"
            placeholder="Branch Manager"
          />
        </div>
        <div className="flex justify-end gap-2 mt-5">
          <Link href="/dashboard/branches">
            <CustomButton
              text="Cancel"
              type="reset"
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
