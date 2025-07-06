"use client";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SalesCustomerFormValues,
  SalesCustomerFormValuesSchema,
} from "@/lib/validations/dashboard/sales/salesCustomerSchema";
import { useGetBranchesQuery } from "@/redux/services/dashboard/inventory/branchesApi";
import { useGetEmployeesQuery } from "@/redux/services/dashboard/hr/employeeApi";
import { Form } from "@/components/ui/form";
import CustomButton from "@/components/formFields/CustomButton";
import TextInput from "@/components/formFields/TextInput";
import CustomSelect from "@/components/formFields/CustomSelect";
import CustomTextArea from "@/components/formFields/TextArea";
import useExtraFields from "@/hooks/useExtraFields";
import ExtraFields from "@/components/formFields/ExtraFields";
import Image from "next/image";
import { useEffect } from "react";

interface SalesCustomerFormProps {
  defaultValues?: Partial<SalesCustomerFormValues>;
  onSubmit: (data: SalesCustomerFormValues) => Promise<void>;
  isLoading?: boolean;
}
interface listItems {
  id: number;
  name: string;
}

const SalesCustomerForm = ({
  onSubmit,
  defaultValues,
  isLoading,
}: SalesCustomerFormProps) => {
  const globalTranslate = useTranslations();
  const t = useTranslations("Sales.SalesCustomer");
  const { data: branchesData } = useGetBranchesQuery({});
  const { data: employeesData } = useGetEmployeesQuery({});

  const form = useForm<SalesCustomerFormValues>({
    resolver: zodResolver(SalesCustomerFormValuesSchema),
    defaultValues: defaultValues || {
      customer_name: "",
      contact_person: "",
      phone_numbers: [{ phone_number: "", description: "" }],
      email: "",
      address: "",
      city: "",
      country: "",
      notes: "",
      branch: undefined,
      customer_type: "individual",
      tax_number: "",
      national_id: "",
      extra_fields: {},
      source: "other",
      assigned_to: null,
      recommended_by: undefined,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "phone_numbers",
  });
  useEffect(() => {
    if (form.watch("source") !== "recommendation") {
      form.setValue("recommended_by", null); // أو undefined
    }
  }, [form]);

  const branchesOptions =
    branchesData?.results?.map((branch: listItems) => ({
      value: String(branch.id),
      label: branch.name,
    })) || [];

  const employeeOptions =
    employeesData?.results?.map((employee: listItems) => ({
      value: employee.id,
      label: employee.name,
    })) || [];
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
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <section className="min-h-[60vh]">
          <div className="grid sm:grid-cols-2 gap-x-4 gap-y-2 xl:gap-y-5 lg:gap-x-10">
            <TextInput
              control={form.control}
              name="customer_name"
              label={t("customerName")}
              placeholder={t("customerName")}
            />
            <TextInput
              control={form.control}
              name="contact_person"
              label={t("contactPerson")}
              placeholder={t("contactPerson")}
            />
            <TextInput
              control={form.control}
              name="email"
              label={t("email")}
              placeholder={t("email")}
              type="email"
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
              name="country"
              label={t("country")}
              placeholder={t("country")}
            />
            <CustomTextArea
              control={form.control}
              name="notes"
              label={t("notes")}
              placeholder={t("notes")}
            />
            <CustomSelect
              valueType="number"
              control={form.control}
              name="branch"
              label={t("branch")}
              placeholder={t("branch")}
              options={branchesOptions}
            />
            <CustomSelect
              valueType="string"
              control={form.control}
              name="customer_type"
              label={t("customerType")}
              placeholder={t("customerType")}
              options={[
                { value: "individual", label: "Individual" },
                { value: "company", label: "Company" },
              ]}
            />
            <TextInput
              control={form.control}
              name="tax_number"
              label={t("taxNumber")}
              placeholder={t("taxNumber")}
            />
            <TextInput
              control={form.control}
              name="national_id"
              label={t("nationalId")}
              placeholder={t("nationalId")}
            />
            <CustomSelect
              control={form.control}
              name="source"
              label={t("source")}
              placeholder={t("source")}
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
              valueType="number"
              label={t("assignedTo")}
              placeholder={t("assignedTo")}
              options={employeeOptions}
            />
            {form.watch("source") === "recommendation" && (
              <CustomSelect
                valueType="number"
                control={form.control}
                name="recommended_by"
                label={t("recommendedBy")}
                placeholder={t("recommendedBy")}
                options={employeeOptions}
              />
            )}
          </div>

          {/* Phone Numbers */}
          <div className="col-span-2 mt-4">
            <label className="block text-sm font-medium text-gray-700">
              {t("phoneNumbers")}
            </label>
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="grid grid-cols-2 gap-4 my-4 items-start relative"
              >
                <TextInput
                  control={form.control}
                  name={`phone_numbers.${index}.phone_number`}
                  label={t("phoneNumber")}
                  placeholder={t("phoneNumber")}
                />
                <TextInput
                  control={form.control}
                  name={`phone_numbers.${index}.description`}
                  label={t("description")}
                  placeholder={t("description")}
                />
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="absolute -top-1 right-1 bg-red-500 rounded-full p-2"
                >
                  <Image
                    src="/assets/icons/dashboard/close.svg"
                    alt="remove"
                    width="10"
                    height="10"
                  />
                </button>
              </div>
            ))}
            <CustomButton
              text={t("addPhoneNumber")}
              type="button"
              onClick={() => append({ phone_number: "", description: "" })}
              className="mt-2"
            />
          </div>

          <ExtraFields
            extraFields={extraFields}
            onAddField={handleAddExtraField}
            onRemoveField={handleRemoveExtraField}
            onFieldChange={handleExtraFieldChange}
          />
        </section>

        <div className="flex justify-end gap-2 mt-5 flex-col-reverse xs:flex-row">
          <Link href="/dashboard/sales?tab=sales-customer" passHref>
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
            type="submit"
          />
        </div>
        <pre>{JSON.stringify(form.formState.errors, null, 2)}</pre>
      </form>
    </Form>
  );
};

export default SalesCustomerForm;
