"use client";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomButton from "@/components/formFields/CustomButton";
import TextInput from "@/components/formFields/TextInput";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useCreateClientRequestMutation } from "@/redux/services/clientRequestApi";
import CustomSelect from "@/components/formFields/CustomSelect";
import { useGetServicesQuery } from "@/redux/services/website/servicesApi";
import { useGetBranchesQuery } from "@/redux/services/dashboard/inventory/branchesApi";
import { clientRequestSchema } from "@/lib/validations/dashboard/sales/clientRequestSchema";
import PhoneInputField from "@/components/formFields/PhoneInputField";
import { listItems } from "@/lib/utils/types";

interface ClientRequestFormProps {
  defaultValues?: ClientRequestFormValues;
  onSubmit?: (data: ClientRequestFormValues) => Promise<void>;
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

const ClientRequestForm = ({
  defaultValues,
  onSubmit,
}: ClientRequestFormProps) => {
  const t = useTranslations("Sales");

  const { data: branches = [], isLoading: isBranchesLoading } =
    useGetBranchesQuery({});
  const { data: services = [], isLoading: isServicesLoading } =
    useGetServicesQuery({});

  const branchOptions = branches?.results?.map((branch: listItems) => ({
    value: branch.id.toString(),
    label: branch.name,
  }));

  const serviceOptions = services?.results?.map((service: listItems) => ({
    value: service.id.toString(),
    label: service.name,
  }));

  const form = useForm<ClientRequestFormValues>({
    resolver: zodResolver(clientRequestSchema),
    defaultValues: defaultValues || {
      full_name: "nermooooooooooooo",
      phone_number: "+201275256896",
      car_type: "mmmmmmmmmmmmmmmmm",
      car_model: "mmmmmmmmmmmmmmmmm",
      status: "pending",
      description: "mmmmmmmmmmmmmmmmm",
      order_note: "mmmmmmmmmmmmmmmmm",
      service: 1,
      branch: 1,
    },
  });

  const [createClientRequest, { isLoading }] = useCreateClientRequestMutation();

  const handleSubmit = async (data: ClientRequestFormValues) => {
    console.log("Form data submitted:", data);
    try {
      if (onSubmit) {
        await onSubmit(data);
      } else {
        const result = await createClientRequest(data).unwrap();
        console.log("Client request created successfully!", result);
      }
    } catch (error) {
      console.error("Failed to submit form:", error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit, (errors) =>
          console.error("Validation errors:", errors)
        )}
      >
        <section className="min-h-[60vh]">
          <div className="grid sm:grid-cols-2 gap-x-4 gap-y-2 xl:gap-y-5 lg:gap-x-10">
            <TextInput
              control={form.control}
              name="full_name"
              label={t("ClientRequest.fullName")}
              placeholder={t("ClientRequest.fullName")}
            />

            <PhoneInputField
              control={form.control}
              name="phone_number"
              label={t("ClientRequest.phoneNumber")}
              //  placeholder={t("ClientRequest.phoneNumber")}
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

            <CustomSelect
              control={form.control}
              name="service"
              label={t("ClientRequest.service")}
              placeholder={t("ClientRequest.service")}
              options={serviceOptions}
              valueType="number"
              readonly={isServicesLoading}
            />

            <CustomSelect
              control={form.control}
              name="branch"
              label={t("ClientRequest.branch")}
              placeholder={t("ClientRequest.branch")}
              options={branchOptions}
              valueType="number"
              readonly={isBranchesLoading}
            />
          </div>
        </section>

        <div className="flex justify-end gap-2 mt-5 flex-col-reverse xs:flex-row">
          <Link href="/dashboard/sales?tab=sales-quotation" passHref>
            <CustomButton text={t("cancel")} variant="secondary" />
          </Link>

          <CustomButton text={t("save")} type="submit" isDisabled={isLoading} />
        </div>
      </form>
    </Form>
  );
};

export default ClientRequestForm;
