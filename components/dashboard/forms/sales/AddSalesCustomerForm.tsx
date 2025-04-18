"use client";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomButton from "@/components/formFields/CustomButton";
import TextInput from "@/components/formFields/TextInput";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import {
  SalesCustomerFormValues,
  SalesCustomerFormValuesSchema,
} from "@/lib/validations/dashboard/sales/salesCustomerSchema";
import CustomSelect from "@/components/formFields/CustomSelect";
import { useGetBranchesQuery } from "@/redux/services/dashboard/inventory/branchesApi";
import { useCreateSalesCustomerMutation } from "@/redux/services/dashboard/sales/salesCustomerApi";
import { useRouter } from "@/i18n/routing";
import { useState } from "react";
import CustomModal from "@/components/modals/CustomModal";
import PhoneInputField from "@/components/formFields/PhoneInputField";
import useExtraFields from "@/hooks/useExtraFields";
import ExtraFields from "@/components/formFields/ExtraFields";
import { useGetEmployeesQuery } from "@/redux/services/dashboard/hr/employeeApi";

interface SalesCustomerFormProps {
  defaultValues?: Partial<SalesCustomerFormValues>;
}

const AddSalesCustomerForm = ({ defaultValues }: SalesCustomerFormProps) => {
  const router = useRouter();
  const t = useTranslations("Sales");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createSalesCustomer] = useCreateSalesCustomerMutation();
  const { data: branchesData } = useGetBranchesQuery({});
  const { data: employeesData } = useGetEmployeesQuery({});

  const form = useForm<SalesCustomerFormValues>({
    resolver: zodResolver(SalesCustomerFormValuesSchema),
    defaultValues: defaultValues || {
      customer_name: "nermennnnnnnnnnnnnn",
      contact_person: "nermo",
      phone_number: "+13127598362138",
      email: "",
      address: "",
      city: "",
      country: "",
      notes: "",
      branch: 0,
      customer_type: "individual",
      tax_number: "",
      national_id: "",
      extra_fields: {},
      source: "other",
      assigned_to: null,
      recommended_by: null,
    },
  });

  const branchesOptions =
    branchesData?.results?.map((branch: { id: number; name: string }) => ({
      value: String(branch.id),
      label: branch.name,
    })) || [];

  const employeeOptions =
    employeesData?.results?.map((employee: { id: number; name: string }) => ({
      value: String(employee.id),
      label: employee.name,
    })) || [];

  const handleSubmit = async (data: SalesCustomerFormValues) => {
    console.log("Form data submitted:", data);
    console.log("Form errors:", form.formState.errors);
    try {
      console.log("Submit button clicked");
      console.log("Form data:", data);
      const payload = {
        ...data,
      };
      console.log("Payload:", payload);
      const response = await createSalesCustomer(payload);
      console.log("API response:", response);
      if ("error" in response) {
        console.error("API error:", response.error);
        throw new Error("Creation failed");
      }
      console.log("Customer created successfully");
      router.push(`/dashboard/sales?tab=Customer`);
    } catch (error) {
      console.error("Error in creation:", error);
      setIsModalOpen(true);
    }
  };
  const handleModalChange = (isOpen: boolean) => {
    setIsModalOpen(isOpen);
  };

  const {
    extraFields,
    handleAddExtraField,
    handleRemoveExtraField,
    handleExtraFieldChange,
  } = useExtraFields({
    defaultFields: defaultValues?.extra_fields ?? {},
    setValue: form.setValue,
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <section className="min-h-[60vh]">
          <div className="grid sm:grid-cols-2 gap-x-4 gap-y-2 xl:gap-y-5 lg:gap-x-10">
            <TextInput
              control={form.control}
              name="customer_name"
              label={t("SalesCustomer.customerName")}
              placeholder={t("SalesCustomer.customerName")}
            />
            <TextInput
              control={form.control}
              name="contact_person"
              label={t("SalesCustomer.contactPerson")}
              placeholder={t("SalesCustomer.contactPerson")}
            />
            <PhoneInputField
              control={form.control}
              name="phone_number"
              label={t("SalesCustomer.phoneNumber")}
              // placeholder={t("SalesCustomer.phoneNumber")}
            />

            <TextInput
              control={form.control}
              name="email"
              label={t("SalesCustomer.email")}
              placeholder={t("SalesCustomer.email")}
              type="email"
            />
            <TextInput
              control={form.control}
              name="address"
              label={t("SalesCustomer.address")}
              placeholder={t("SalesCustomer.address")}
            />
            <TextInput
              control={form.control}
              name="city"
              label={t("SalesCustomer.city")}
              placeholder={t("SalesCustomer.city")}
            />
            <TextInput
              control={form.control}
              name="country"
              label={t("SalesCustomer.country")}
              placeholder={t("SalesCustomer.country")}
            />
            <TextInput
              control={form.control}
              name="notes"
              label={t("SalesCustomer.notes")}
              placeholder={t("SalesCustomer.notes")}
            />
            <CustomSelect
              valueType="number"
              control={form.control}
              name="branch"
              label={t("SalesCustomer.branch")}
              placeholder={t("SalesCustomer.branch")}
              options={branchesOptions}
            />
            <CustomSelect
              valueType="string"
              control={form.control}
              name="customer_type"
              label={t("SalesCustomer.customerType")}
              placeholder={t("SalesCustomer.customerType")}
              options={[
                { value: "individual", label: "Individual" },
                { value: "business", label: "Business" },
              ]}
            />
            <TextInput
              control={form.control}
              name="tax_number"
              label={t("SalesCustomer.taxNumber")}
              placeholder={t("SalesCustomer.taxNumber")}
            />
            <TextInput
              control={form.control}
              name="national_id"
              label={t("SalesCustomer.nationalId")}
              placeholder={t("SalesCustomer.nationalId")}
            />
            <CustomSelect
              control={form.control}
              name="source"
              label={t("SalesCustomer.source")}
              placeholder={t("SalesCustomer.source")}
              options={[
                { value: "facebook", label: "Facebook" },
                { value: "instagram", label: "Instagram" },
                { value: "tiktok", label: "TikTok" },
                { value: "twitter", label: "Twitter" },
                { value: "recommendation", label: "Recommendation" },
                { value: "other", label: "Other" },
              ]}
            />
            <CustomSelect
              control={form.control}
              name="assigned_to"
              label={t("SalesCustomer.assignedTo")}
              placeholder={t("SalesCustomer.assignedTo")}
              options={employeeOptions}
            />
            {form.watch("source") === "recommendation" && (
              <CustomSelect
                control={form.control}
                name="recommended_by"
                label={t("SalesCustomer.recommendedBy")}
                placeholder={t("SalesCustomer.recommendedBy")}
                options={employeeOptions}
              />
            )}
          </div>
          <ExtraFields
            extraFields={extraFields}
            onAddField={handleAddExtraField}
            onRemoveField={handleRemoveExtraField}
            onFieldChange={handleExtraFieldChange}
          />
        </section>
        <div className="flex justify-end gap-2 mt-5 flex-col-reverse xs:flex-row">
          <Link href={`/dashboard/sales?tab=${t("customer")}`} passHref>
            <CustomButton text={t("cancel")} variant="secondary" />
          </Link>
          <CustomButton text={t("save")} type="submit" />
        </div>
      </form>

      <CustomModal
        isOpen={isModalOpen}
        onChange={handleModalChange}
        title={t("errorTitle")}
        description={t("errorDescription")}
      />
    </Form>
  );
};

export default AddSalesCustomerForm;
