"use client";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { customerRequestSchema } from "@/lib/validations/dashboard/customerRequestSchema";
import CustomButton from "@/components/formFields/CustomButton";
import TextInput from "@/components/formFields/TextInput";
import PhoneInputField from "@/components/formFields/PhoneInputField";
import CustomSelect from "@/components/formFields/CustomSelect";
import { Link } from "@/i18n/routing";
import TextArea from "@/components/formFields/TextArea";

interface CustomerRequestFormProps {
  onSubmit: (data: CustomerRequestFormValues) => Promise<void>;
  defaultValues?: CustomerRequestFormValues;
}

export interface CustomerRequestFormValues {
  client_name: string;
  phone_number: string;
  car_type: string;
  car_model: string;
  service: string;
  branch: string;
  additional_notes?: string;
}

const CustomerRequestForm = ({
  onSubmit,
  defaultValues,
}: CustomerRequestFormProps) => {
  const form = useForm({
    resolver: zodResolver(customerRequestSchema),
    defaultValues: defaultValues || {
      client_name: "",
      phone_number: "",
      car_type: "",
      car_model: "",
      service: "",
      branch: "",
      additional_notes: "",
    },
  });

  const carTypeOptions = [
    { value: "Sedan", label: "Sedan" },
    { value: "SUV", label: "SUV" },
    { value: "Truck", label: "Truck" },
  ];

  const carModelOptions = [
    { value: "Model A", label: "Model A" },
    { value: "Model B", label: "Model B" },
    { value: "Model C", label: "Model C" },
  ];

  const serviceOptions = [
    { value: "Service 1", label: "Service 1" },
    { value: "Service 2", label: "Service 2" },
    { value: "Service 3", label: "Service 3" },
  ];

  const branchOptions = [
    { value: "Branch 1", label: "Branch 1" },
    { value: "Branch 2", label: "Branch 2" },
    { value: "Branch 3", label: "Branch 3" },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid sm:grid-cols-2 gap-x-4 gap-y-2 xl:gap-y-5 lg:gap-x-10">
          <TextInput
            control={form.control}
            name="client_name"
            label="Client Name"
            placeholder="Client Name"
          />
          <PhoneInputField
            control={form.control}
            name="phone_number"
            label="Phone Number"
          />
          <CustomSelect
            control={form.control}
            name="car_type"
            label="Car Type"
            placeholder="Car Type"
            options={carTypeOptions}
          />
          <CustomSelect
            control={form.control}
            name="car_model"
            label="Car Model"
            placeholder="Car Model"
            options={carModelOptions}
          />
          <CustomSelect
            control={form.control}
            name="service"
            label="Choose Service"
            placeholder="Choose Service"
            options={serviceOptions}
          />
          <CustomSelect
            control={form.control}
            name="branch"
            label="Choose Branch"
            placeholder="Choose Branch"
            options={branchOptions}
          />
        </div>
        <TextArea
          control={form.control}
          name="additional_notes"
          label="Additional Notes"
          placeholder="Additional Notes"
          className="mt-2 xl:mt-5"
        />
        <div className="flex justify-end gap-2 mt-5 flex-col-reverse xs:flex-row">
          <Link href="/dashboard/customer-requests" passHref>
            <CustomButton text="Cancel" variant="secondary" />
          </Link>

          <CustomButton text="Save" />
        </div>
      </form>
    </Form>
  );
};

export default CustomerRequestForm;
