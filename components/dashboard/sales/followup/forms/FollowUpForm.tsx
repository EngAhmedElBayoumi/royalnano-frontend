"use client";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FollowUpFormValues,
  followUpSchema,
} from "@/lib/validations/dashboard/sales/followUp/followUpSchema";
import { listItems } from "@/lib/utils/types";
import { useGetFollowUpTypesQuery } from "@/redux/services/dashboard/sales/followUpTypesApi";
import { useGetMiniSalesCustomerQuery } from "@/redux/services/dashboard/sales/salesCustomerApi";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import CustomButton from "@/components/formFields/CustomButton";
import CustomSelect from "@/components/formFields/CustomSelect";
import TextArea from "@/components/formFields/TextArea";
import DateTimePicker from "@/components/formFields/DateTimePicker";

interface FollowUpFormProps {
  onSubmit: (data: FollowUpFormValues) => Promise<void>;
  defaultValues?: FollowUpFormValues;
  isLoading?: boolean;
  hideCustomer?: boolean;
}

const FollowUpForm = ({
  onSubmit,
  defaultValues,
  isLoading,
  hideCustomer,
}: FollowUpFormProps) => {
  const t = useTranslations("follow_up");
  const globalTranslate = useTranslations();

  const form = useForm({
    resolver: zodResolver(followUpSchema),
    defaultValues: defaultValues || {
      follow_up_type: 1,
      customer: 1,
      comment: "",
      action_date: new Date(),
    },
  });
  const { data: followUpTypes } = useGetFollowUpTypesQuery({});
  const { data: customers } = useGetMiniSalesCustomerQuery({});

  const followUpTypeOptions =
    followUpTypes?.map((followUpType: listItems) => ({
      value: String(followUpType.id),
      label: followUpType.name,
    })) || [];

  const customerOptions =
    customers?.map((customer: listItems) => ({
      value: String(customer.id),
      label: customer.name,
    })) || [];
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <section className="min-h-[60vh] space-y-4">
          {!hideCustomer && (
            <CustomSelect
              control={form.control}
              name="customer"
              label={t("customer")}
              placeholder={t("customer")}
              options={customerOptions}
            />
          )}
          <CustomSelect
            control={form.control}
            name="follow_up_type"
            label={t("follow_up_type")}
            placeholder={t("select_follow_up_type")}
            options={followUpTypeOptions}
          />
          <DateTimePicker
            control={form.control}
            name="action_date"
            label={t("action_date")}
            placeholder={t("select_date_time")}
            className="mt-2 xl:mt-5"
          />
          <TextArea
            control={form.control}
            name="comment"
            label={t("comment")}
            placeholder={t("comment")}
            className="mt-2 xl:mt-5"
          />
        </section>
        <section className="flex justify-end gap-2 mt-5 flex-col-reverse xs:flex-row">
          <Link
            href="/dashboard/sales?tab=followup&subtab=follow-up-type"
            passHref
          >
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
        </section>
      </form>
    </Form>
  );
};

export default FollowUpForm;
