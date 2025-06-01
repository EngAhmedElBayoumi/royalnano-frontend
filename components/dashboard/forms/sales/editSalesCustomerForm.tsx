"use client";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomButton from "@/components/formFields/CustomButton";
import TextInput from "@/components/formFields/TextInput";
import { Link } from "@/i18n/routing";
import { useSearchParams } from "next/navigation"; // Use useSearchParams to extract query params
import { useTranslations } from "next-intl";
import {
  SalesCustomerFormValues,
  SalesCustomerFormValuesSchema,
} from "@/lib/validations/dashboard/sales/salesCustomerSchema";
import CustomSelect from "@/components/formFields/CustomSelect";
import { useGetBranchesQuery } from "@/redux/services/dashboard/inventory/branchesApi";
import { useUpdateSalesCustomerMutation } from "@/redux/services/dashboard/sales/salesCustomerApi"; // Use update mutation
import { useRouter } from "@/i18n/routing";
import { useState } from "react";
import CustomModal from "@/components/modals/CustomModal";
import PhoneInputField from "@/components/formFields/PhoneInputField";

interface EditSalesCustomerFormProps {
  defaultValues?: Partial<SalesCustomerFormValues>;
}

const EditSalesCustomerForm = ({
  defaultValues,
}: EditSalesCustomerFormProps) => {
  const router = useRouter();
  const searchParams = useSearchParams(); // Extract query parameters
  const t = useTranslations("Sales");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateSalesCustomer] = useUpdateSalesCustomerMutation();
  const { data: branchesData } = useGetBranchesQuery({});

  // Extract customerId from query parameters
  const customerIdFromQuery = searchParams.get("customerId");
  const initialCustomerId = customerIdFromQuery
    ? parseInt(customerIdFromQuery, 10)
    : 0;

  const form = useForm<SalesCustomerFormValues>({
    resolver: zodResolver(SalesCustomerFormValuesSchema),
    defaultValues: defaultValues || {
      customer_name: "",
      contact_person: "",
      phone_number: "",
      email: "",
      address: "",
      city: "",
      country: "",
      notes: "",
      branch: 0,
      customer_type: "individual",
      tax_number: "",
      national_id: "",
    },
  });

  const branchesOptions =
    branchesData?.results?.map((branch: { id: number; name: string }) => ({
      value: String(branch.id),
      label: branch.name,
    })) || [];

  const handleSubmit = async (data: SalesCustomerFormValues) => {
    try {
      const payload = {
        ...data,
      };
      const response = await updateSalesCustomer(payload);
      if ("error" in response) {
        console.error("API error:", response.error);
        throw new Error("Update failed");
      }
      router.push(
        initialCustomerId
          ? `/dashboard/sales/sales-customer/view?id=${initialCustomerId}&tab=details`
          : `/dashboard/sales?tab=sales-customer`
      );
    } catch (error) {
      console.error("Error in update:", error);
      setIsModalOpen(true);
    }
  };

  const handleModalChange = (isOpen: boolean) => {
    setIsModalOpen(isOpen);
  };

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
          </div>
        </section>
        <div className="flex justify-end gap-2 mt-5 flex-col-reverse xs:flex-row">
          <Link
            href={
              initialCustomerId
                ? `/dashboard/sales/sales-customer/view?id=${initialCustomerId}&tab=details`
                : `/dashboard/sales?tab=sales-customer`
            }
            passHref
          >
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

export default EditSalesCustomerForm;
