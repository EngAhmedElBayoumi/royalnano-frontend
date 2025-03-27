"use client";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomButton from "@/components/formFields/CustomButton";
import TextInput from "@/components/formFields/TextInput";
import { useTranslations } from "next-intl";
import { supplierSchema } from "@/lib/validations/dashboard/purchase/supplierSchema";

interface SupplierFormProps {
  onSubmit: (data: SupplierFormValues) => Promise<void>;
  defaultValues?: SupplierFormValues;
  isView?: boolean;
}

export interface SupplierFormValues {
  items: {
    id: number;
    item_name: string;
    item_code: string;
  };
  supplier_by(supplier_by: { id: number; name: string }): unknown;
  title: string;
  full_name: string;
  supplier_name: string;
  phone_number: string;
  street_address: string;
  city: string;
  province: string;
  country: string;
  postal_code: string;
  taxes_business_id: string;
  expenses_rates_billing_rate: string;
  payment_terms: string;
  account_no: string;
  opening_balance: string;
  as_of: string;
  id: number;
  suffix: string;
  additional_info: string;
  branch: number;
  accounting_expenses_category: number;
}

const SupplierForm = ({
  onSubmit,
  defaultValues,
  isView = false,
}: SupplierFormProps) => {
  const form = useForm<SupplierFormValues>({
    resolver: zodResolver(supplierSchema),
    defaultValues: defaultValues || {
      title: "Mr.",
      full_name: "John Doe",
      supplier_name: "Doe Supplies",
      phone_number: "+9146964038",
      street_address: "123 Main St",
      city: "New York",
      province: "NY",
      country: "USA",
      postal_code: "10001",
      taxes_business_id: "TX123",
      expenses_rates_billing_rate: "50.00",
      payment_terms: "Net 30",
      account_no: "ACC123",
      opening_balance: "1000.00",
      as_of: "2023-10-01",
      id: 1,
      suffix: "Jr.",
      additional_info: "Sample additional information.",
      branch: 1,
      accounting_expenses_category: 2,
    },
  });

  const t = useTranslations("Purchase.Supplier");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <section className="min-h-[60vh]">
          {/* Top-Level Fields */}
          <div className="grid sm:grid-cols-2 gap-x-4 gap-y-2 xl:gap-y-5 lg:gap-x-10">
            <TextInput
              control={form.control}
              name="title"
              label={t("title")}
              placeholder={t("title")}
              readonly={isView}
            />
            <TextInput
              control={form.control}
              name="full_name"
              label={t("fullName")}
              placeholder={t("fullName")}
              readonly={isView}
            />
            <TextInput
              control={form.control}
              name="supplier_name"
              label={t("supplierName")}
              placeholder={t("supplierName")}
              readonly={isView}
            />
            <TextInput
              control={form.control}
              name="phone_number"
              label={t("phoneNumber")}
              placeholder={t("phoneNumber")}
              readonly={isView}
            />
            <TextInput
              control={form.control}
              name="street_address"
              label={t("streetAddress")}
              placeholder={t("streetAddress")}
              readonly={isView}
            />
            <TextInput
              control={form.control}
              name="city"
              label={t("city")}
              placeholder={t("city")}
              readonly={isView}
            />
            <TextInput
              control={form.control}
              name="province"
              label={t("province")}
              placeholder={t("province")}
              readonly={isView}
            />
            <TextInput
              control={form.control}
              name="country"
              label={t("country")}
              placeholder={t("country")}
              readonly={isView}
            />
            <TextInput
              control={form.control}
              name="postal_code"
              label={t("postalCode")}
              placeholder={t("postalCode")}
              readonly={isView}
            />
            <TextInput
              control={form.control}
              name="taxes_business_id"
              label={t("taxesBusinessId")}
              placeholder={t("taxesBusinessId")}
              readonly={isView}
            />
            <TextInput
              control={form.control}
              name="expenses_rates_billing_rate"
              label={t("billingRate")}
              placeholder={t("billingRate")}
              readonly={isView}
            />
            <TextInput
              control={form.control}
              name="payment_terms"
              label={t("paymentTerms")}
              placeholder={t("paymentTerms")}
              readonly={isView}
            />
            <TextInput
              control={form.control}
              name="account_no"
              label={t("accountNo")}
              placeholder={t("accountNo")}
              readonly={isView}
            />
            <TextInput
              control={form.control}
              name="opening_balance"
              label={t("openingBalance")}
              placeholder={t("openingBalance")}
              readonly={isView}
            />
            <TextInput
              control={form.control}
              name="as_of"
              label={t("asOf")}
              placeholder={t("asOf")}
              readonly={isView}
            />
            <TextInput
              control={form.control}
              name="id"
              label={t("id")}
              placeholder={t("id")}
              type="number"
              readonly={isView}
            />
            <TextInput
              control={form.control}
              name="suffix"
              label={t("suffix")}
              placeholder={t("suffix")}
              readonly={isView}
            />
            <TextInput
              control={form.control}
              name="additional_info"
              label={t("additionalInfo")}
              placeholder={t("additionalInfo")}
              readonly={isView}
            />
            <TextInput
              control={form.control}
              name="branch"
              label={t("branch")}
              placeholder={t("branch")}
              type="number"
              readonly={isView}
            />
            <TextInput
              control={form.control}
              name="accounting_expenses_category"
              label={t("accountingExpensesCategory")}
              placeholder={t("accountingExpensesCategory")}
              type="number"
              readonly={isView}
            />
          </div>
        </section>

        {/* Buttons */}
        {!isView && (
          <div className="flex justify-end gap-2 mt-5">
            <CustomButton text={t("cancel")} variant="secondary" />
            <CustomButton text={t("save")} type="submit" />
          </div>
        )}
      </form>
    </Form>
  );
};

export default SupplierForm;
