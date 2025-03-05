"use client";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomButton from "@/components/formFields/CustomButton";
import TextInput from "@/components/formFields/TextInput";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { salesQuotationSchema } from "@/lib/validations/dashboard/sales/salesQuotationSchema";

interface ClientRequestFormProps {
  onSubmit: (data: ClientRequestFormValues) => Promise<void>;
  defaultValues?: ClientRequestFormValues;
}

export interface ClientRequestFormValues {
  full_name: string;
  phone_number: string;
  car_type: string;
  car_model: string;
  status: string;
  description: string;
  order_note: string;
  service: number;
  branch: number;
}

const ClientRequestForm = ({ onSubmit, defaultValues }: ClientRequestFormProps) => {
  const form = useForm<ClientRequestFormValues>({
    resolver: zodResolver(salesQuotationSchema),
    defaultValues: defaultValues || {
      full_name: "",
      phone_number: "",
      car_type: "",
      car_model: "",
      status: "pending",
      description: "",
      order_note: "",
      service: 0,
      branch: 0,
    },
  });

  const t = useTranslations("Sales");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <section className="min-h-[60vh]">
          <div className="grid sm:grid-cols-2 gap-x-4 gap-y-2 xl:gap-y-5 lg:gap-x-10">
            <TextInput
              control={form.control}
              name="full_name"
              label={t("ClientRequest.fullName")}
              placeholder={t("ClientRequest.fullName")}
            />
            <TextInput
              control={form.control}
              name="phone_number"
              label={t("ClientRequest.phoneNumber")}
              placeholder={t("ClientRequest.phoneNumber")}
            />
            <TextInput
              control={form.control}
              name="car_type"
              label={t("ClientRequest.carType")}
              placeholder={t("ClientRequest.carType")}
            />
            <TextInput
              control={form.control}
              name="car_model"
              label={t("ClientRequest.carModel")}
              placeholder={t("ClientRequest.carModel")}
            />
            <TextInput
              control={form.control}
              name="status"
              label={t("ClientRequest.status")}
              placeholder={t("ClientRequest.status")}
            />
            <TextInput
              control={form.control}
              name="description"
              label={t("ClientRequest.description")}
              placeholder={t("ClientRequest.description")}
            />
            <TextInput
              control={form.control}
              name="order_note"
              label={t("ClientRequest.orderNote")}
              placeholder={t("ClientRequest.orderNote")}
            />
            <TextInput
              control={form.control}
              name="service"
              label={t("ClientRequest.service")}
              placeholder={t("ClientRequest.service")}
            />
            <TextInput
              control={form.control}
              name="branch"
              label={t("ClientRequest.branch")}
              placeholder={t("ClientRequest.branch")}
            />
          </div>
        </section>
        <div className="flex justify-end gap-2 mt-5">
          <Link href={`/dashboard/sales?tab=${t("salesQuotation")}`} passHref>
            <CustomButton
              text={t("cancel")}
              className="text-white rounded-lg bg-secondary min-w-[160px] xl:min-w-[222px] font-bold text-sm xl:text-[20px]"
            />
          </Link>
          <CustomButton
            text={t("save")}
            type="submit"
            className="text-white rounded-lg min-w-[160px] xl:min-w-[222px] font-bold text-sm xl:text-[20px]"
          />
        </div>
      </form>
    </Form>
  );
};

export default ClientRequestForm;