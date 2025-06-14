"use client";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BranchTransactionsFormValues, branchTransactionsSchema } from "@/lib/validations/dashboard/branches/branchTransactionsSchema";
import { useGetBranchesQuery } from "@/redux/services/dashboard/inventory/branchesApi";
import { ACCEPTED_IMAGE_TYPES, listItems } from "@/lib/utils/types";
import { Form } from "@/components/ui/form";
import CustomButton from "@/components/formFields/CustomButton";
import TextInput from "@/components/formFields/TextInput";
import FileInput from "@/components/formFields/FileInput";
import TextArea from "@/components/formFields/TextArea";
import CustomSelect from "@/components/formFields/CustomSelect";

interface BranchTransactionsFormProps {
  onSubmit: (data: BranchTransactionsFormValues) => Promise<void>;
  defaultValues?: BranchTransactionsFormValues;
  isLoading?: boolean;
}



const BranchTransactionsForm = ({
  onSubmit,
  defaultValues,
  isLoading,
}: BranchTransactionsFormProps) => {
  const form = useForm({
    resolver: zodResolver(branchTransactionsSchema),
    defaultValues: defaultValues || {
      transaction_type: "deposit",
      amount: "0.00",
      description: "",
      branch: 1,
      image_reset: null,
    },
  });
  const globalTranslate = useTranslations();
  const t = useTranslations("branches.branches_transactions");
  const { data: branches } = useGetBranchesQuery({});
  const branchesOptions =
    branches?.results?.map((branch: listItems) => ({
      value: String(branch.id),
      label: branch.name,
    })) || [];
  const transactionTypeOptions = [
    { value: "deposit", label: t("deposit") },
    { value: "withdraw", label: t("withdraw") },
  ];
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <section className="min-h-[60vh]">
          <div className="grid sm:grid-cols-2 gap-x-4 gap-y-2 xl:gap-y-5 lg:gap-x-10">
            <CustomSelect
              control={form.control}
              name="transaction_type"
              label={t("transaction_type")}
              placeholder={t("transaction_type")}
              options={transactionTypeOptions}
            />
            <TextInput
              control={form.control}
              name="amount"
              label={t("amount")}
              placeholder={t("amount")}
            />
            <CustomSelect
              control={form.control}
              name="branch"
              label={t("branch")}
              placeholder={t("branch")}
              options={branchesOptions}
            />
          </div>
          <TextArea
            control={form.control}
            name="description"
            label={t("description")}
            placeholder={t("description")}
            className="mt-2 xl:mt-5"
          />
          <FileInput
            control={form.control}
            name="image_reset"
            label={t("image_reset")}
            accepted={ACCEPTED_IMAGE_TYPES.join(",")}
            className="mt-2 xl:mt-5"
          />
        </section>
        <div className="flex justify-end gap-2 mt-5 flex-col-reverse xs:flex-row">
          <Link href="/dashboard/website" passHref>
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
          />
        </div>
      </form>
    </Form>
  );
};

export default BranchTransactionsForm;
