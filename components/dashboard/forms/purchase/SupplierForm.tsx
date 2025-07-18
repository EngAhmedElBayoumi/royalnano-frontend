"use client";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomButton from "@/components/formFields/CustomButton";
import TextInput from "@/components/formFields/TextInput";
import DatePicker from "@/components/formFields/DatePicker";
import { useTranslations } from "next-intl";
import { supplierSchema } from "@/lib/validations/dashboard/purchase/supplierSchema";
import CustomSelect from "@/components/formFields/CustomSelect";
import { useGetBranchesQuery } from "@/redux/services/dashboard/inventory/branchesApi";
import { useGetExpenseCategorysQuery } from "@/redux/services/dashboard/purchase/expenseCategory";
import { Link } from "@/i18n/routing";

interface SupplierFormProps {
  onSubmit: (data: SupplierFormValues) => Promise<void>;
  defaultValues?: SupplierFormValues;
  isView?: boolean;
}

export interface SupplierFormValues {
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
  expenses_rates_billing_rate: number;
  payment_terms: string;
  account_no: string;
  opening_balance: number;
  as_of: string;
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
      title: "",
      full_name: "",
      supplier_name: "",
      phone_number: "",
      street_address: "",
      city: "",
      province: "",
      country: "",
      postal_code: "",
      taxes_business_id: "",
      expenses_rates_billing_rate: 0,
      payment_terms: "",
      account_no: "",
      opening_balance: 0,
      as_of: "",
      suffix: "",
      additional_info: "",
      branch: 0,
      accounting_expenses_category: 0,
    },
  });

  const t = useTranslations("Purchase.Supplier");

  const { data: branchesData } = useGetBranchesQuery({});
  const { data: expenseCategoriesData } = useGetExpenseCategorysQuery({});

  const branchOptions = branchesData?.results?.map((branch: { id: number; name: string }) => ({
    value: String(branch.id),
    label: branch.name,
  })) || [];

  const expenseCategoryOptions = expenseCategoriesData?.results?.map((category: { id: number; name: string }) => ({
    value: String(category.id),
    label: category.name,
  })) || [];

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
              type="number"
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
              type="number"
            />
            <DatePicker
              control={form.control}
              name="as_of"
              label={t("asOf")}
              placeholder={t("asOf")}
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
            <CustomSelect
              control={form.control}
              name="branch"
              label={t("branch")}
              placeholder={t("branch")}
              options={branchOptions}
              readonly={isView}
              valueType="number"
            />
            <CustomSelect
              control={form.control}
              name="accounting_expenses_category"
              label={t("accountingExpensesCategory")}
              placeholder={t("accountingExpensesCategory")}
              options={expenseCategoryOptions}
              readonly={isView}
              valueType="number"
            />
          </div>
        </section>

        {/* Buttons */}
        {!isView && (
          <div className="flex justify-end gap-2 mt-5 flex-col-reverse xs:flex-row">
            <Link href="/dashboard/purchase?tab=supplier" passHref>
              <CustomButton text={t("cancel")} variant="secondary" />
            </Link>
            <CustomButton text={t("save")} type="submit" />
          </div>
        )}
      </form>
    </Form>
  );
};

export default SupplierForm;

