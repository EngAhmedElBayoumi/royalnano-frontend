"use client";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { clientSchema } from "@/lib/validations/dashboard/clientSchema";
import CustomButton from "@/components/formFields/CustomButton";
import TextInput from "@/components/formFields/TextInput";
import PhoneInputField from "@/components/formFields/PhoneInputField";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("clients.clientForm");
  
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
            label={t("clientName")}
            placeholder={t("clientName")}
          />

          <TextInput
            control={form.control}
            name="email"
            label={t("email")}
            placeholder={t("email")}
          />

          <PhoneInputField
            control={form.control}
            name="phone_number"
            label={t("phoneNumber")}
          />

          <TextInput
            control={form.control}
            name="facility_name"
            label={t("facilityName")}
            placeholder={t("facilityName")}
          />

          <TextInput
            control={form.control}
            name="tax_number"
            label={t("taxNumber")}
            placeholder={t("taxNumber")}
          />

          <TextInput
            control={form.control}
            name="address"
            label={t("address")}
            placeholder={t("address")}
          />

          <TextInput
            control={form.control}
            name="city"
            label={t("city")}
            placeholder={t("city")}
          />

          <TextInput
            control={form.control}
            name="area"
            label={t("area")}
            placeholder={t("area")}
          />

          <TextInput
            control={form.control}
            name="building_number"
            label={t("buildingNumber")}
            placeholder={t("buildingNumber")}
          />

          <TextInput
            control={form.control}
            name="website"
            label={t("website")}
            placeholder={t("website")}
          />

          <TextInput
            control={form.control}
            name="condition"
            label={t("condition")}
            placeholder={t("condition")}
          />
        </div>
        <div className="flex justify-end gap-2">
          <Link href="/dashboard/clients" passHref>
            <CustomButton text={t("cancel")} variant="secondary" />
          </Link>

          <CustomButton text={t("save")} />
        </div>
      </form>
    </Form>
  );
};

export default ClientForm;
