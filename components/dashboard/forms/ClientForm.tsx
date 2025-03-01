"use client";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { clientSchema } from "@/lib/validations/dashboard/clientSchema";
import CustomButton from "@/components/formFields/CustomButton";
import TextInput from "@/components/formFields/TextInput";
import PhoneInputField from "@/components/formFields/PhoneInputField";
import {Link} from '@/i18n/routing';

interface ClientFormProps {
  onSubmit: (data: ClientFormValues) => Promise<void>;
  defaultValues?: ClientFormValues;
}

export interface ClientFormValues {
  client_name: string;
  email: string;
  phone_number: string;
  facility_name: string;
  tax_number: string;
  address: string;
  city: string;
  area: string;
  building_number: string;
  website?: string;
  condition?: string;
}

const ClientForm = ({ onSubmit, defaultValues }: ClientFormProps) => {
  const form = useForm({
    resolver: zodResolver(clientSchema),
    defaultValues: defaultValues || {
      client_name: "",
      email: "",
      phone_number: "",
      facility_name: "",
      tax_number: "",
      address: "",
      city: "",
      area: "",
      building_number: "",
      website: "",
      condition: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid sm:grid-cols-2 gap-x-4 gap-y-2 xl:gap-y-5 lg:gap-x-10 mb-5">
          <TextInput
            control={form.control}
            name="client_name"
            label="Client Name"
            placeholder="Client Name"
          />

          <TextInput
            control={form.control}
            name="email"
            label="Email"
            placeholder="Email"
          />

          <PhoneInputField
            control={form.control}
            name="phone_number"
            label="Phone Number"
          />

          <TextInput
            control={form.control}
            name="facility_name"
            label="Facility Name"
            placeholder="Facility Name"
          />

          <TextInput
            control={form.control}
            name="tax_number"
            label="Tax Number"
            placeholder="Tax Number"
          />

          <TextInput
            control={form.control}
            name="address"
            label="Address"
            placeholder="Address"
          />

          <TextInput
            control={form.control}
            name="city"
            label="City"
            placeholder="City"
          />

          <TextInput
            control={form.control}
            name="area"
            label="Area"
            placeholder="Area"
          />

          <TextInput
            control={form.control}
            name="building_number"
            label="Building Number"
            placeholder="Building Number"
          />

          <TextInput
            control={form.control}
            name="website"
            label="Website"
            placeholder="Website"
          />

          <TextInput
            control={form.control}
            name="condition"
            label="Condition"
            placeholder="Condition"
          />

        </div>
        <div className="flex justify-end gap-2">
          <Link href="/dashboard/clients" passHref>
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

export default ClientForm;
