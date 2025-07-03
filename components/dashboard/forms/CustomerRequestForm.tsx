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
import { useTranslations } from "next-intl";

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
  const t = useTranslations("customerRequests.customerRequestForm");
  const tCarTypes = useTranslations("customerRequests.carTypes");
  const tCarModels = useTranslations("customerRequests.carModels");
  const tServices = useTranslations("customerRequests.services");
  const tBranches = useTranslations("customerRequests.branches");
  
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
    { value: "Sedan", label: tCarTypes("sedan") },
    { value: "SUV", label: tCarTypes("suv") },
    { value: "Truck", label: tCarTypes("truck") },
  ];

  const carModelOptions = [
    { value: "Model A", label: tCarModels("modelA") },
    { value: "Model B", label: tCarModels("modelB") },
    { value: "Model C", label: tCarModels("modelC") },
  ];

  const serviceOptions = [
    { value: "Service 1", label: tServices("service1") },
    { value: "Service 2", label: tServices("service2") },
    { value: "Service 3", label: tServices("service3") },
  ];

  const branchOptions = [
    { value: "Branch 1", label: tBranches("branch1") },
    { value: "Branch 2", label: tBranches("branch2") },
    { value: "Branch 3", label: tBranches("branch3") },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid sm:grid-cols-2 gap-x-4 gap-y-2 xl:gap-y-5 lg:gap-x-10">
          <TextInput
            control={form.control}
            name="client_name"
            label={t("clientName")}
            placeholder={t("clientName")}
          />
          <PhoneInputField
            control={form.control}
            name="phone_number"
            label={t("phoneNumber")}
          />
          <CustomSelect
            control={form.control}
            name="car_type"
            label={t("carType")}
            placeholder={t("carType")}
            options={carTypeOptions}
          />
          <CustomSelect
            control={form.control}
            name="car_model"
            label={t("carModel")}
            placeholder={t("carModel")}
            options={carModelOptions}
          />
          <CustomSelect
            control={form.control}
            name="service"
            label={t("service")}
            placeholder={t("service")}
            options={serviceOptions}
          />
          <CustomSelect
            control={form.control}
            name="branch"
            label={t("branch")}
            placeholder={t("branch")}
            options={branchOptions}
          />
        </div>
        <TextArea
          control={form.control}
          name="additional_notes"
          label={t("additionalNotes")}
          placeholder={t("additionalNotes")}
          className="mt-2 xl:mt-5"
        />
        <div className="flex justify-end gap-2 mt-5 flex-col-reverse xs:flex-row">
          <Link href="/dashboard/customer-requests" passHref>
            <CustomButton text={t("cancel")} variant="secondary" />
          </Link>

          <CustomButton text={t("save")} />
        </div>
      </form>
    </Form>
  );
};

export default CustomerRequestForm;
