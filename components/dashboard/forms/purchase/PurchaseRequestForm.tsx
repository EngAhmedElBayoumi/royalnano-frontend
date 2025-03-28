"use client";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomButton from "@/components/formFields/CustomButton";
import TextInput from "@/components/formFields/TextInput";
import { useTranslations } from "next-intl";
import { purchaseRequestSchema } from "@/lib/validations/dashboard/purchase/purchaseRequestSchema";

interface PurchaseRequestFormProps {
  onSubmit: (data: PurchaseRequestFormValues) => Promise<void>;
  defaultValues?: PurchaseRequestFormValues;
  isView?: boolean;
}

export interface PurchaseRequestFormValues {
  request_date: string;
  description: string;
  id: number;
  request_by: number;
  branch: number;
  items: {
    kind: string;
    item_kind: string;
    item_name: string;
    unit: string;
    quantity: string;
    unit_price: string;
    id: number;
    total: string;
    description: string;
  }[];
}

const PurchaseRequestForm = ({
  onSubmit,
  defaultValues,
  isView = false,
}: PurchaseRequestFormProps) => {
  const form = useForm<PurchaseRequestFormValues>({
    resolver: zodResolver(purchaseRequestSchema),
    defaultValues: defaultValues || {
      request_date: "2023-10-01",
      description: "Sample purchase request",
      id: 1,
      request_by: 2,
      branch: 3,
      items: [
        {
          kind: "Stationery",
          item_kind: "Notebook",
          item_name: "Notebook A4",
          unit: "Piece",
          quantity: "10",
          unit_price: "2.50",
          id: 1,
          total: "25.00",
          description: "A4 size notebook",
        },
        {
          kind: "Electronics",
          item_kind: "Cable",
          item_name: "USB Cable",
          unit: "Piece",
          quantity: "5",
          unit_price: "3.00",
          id: 2,
          total: "15.00",
          description: "USB Type-C cable",
        },
      ],
    },
  });

  const t = useTranslations("Purchase.Request");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <section className="min-h-[60vh]">
          <div className="grid sm:grid-cols-2 gap-x-4 gap-y-2 xl:gap-y-5 lg:gap-x-10">
            <TextInput
              control={form.control}
              name="request_date"
              label={t("requestDate")}
              placeholder={t("requestDate")}
              readonly={isView}
            />
            <TextInput
              control={form.control}
              name="description"
              label={t("description")}
              placeholder={t("description")}
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
              name="request_by"
              label={t("requestBy")}
              placeholder={t("requestBy")}
              type="number"
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
          </div>

          {/* Items Array */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">{t("items")}</h3>
            {form.watch("items")?.map((item, index) => (
              <div
                key={item.id}
                className="grid sm:grid-cols-2 gap-x-4 gap-y-2 xl:gap-y-5 lg:gap-x-10"
              >
                <TextInput
                  control={form.control}
                  name={`items.${index}.kind`}
                  label={t("kind")}
                  placeholder={t("kind")}
                  readonly={isView}
                />
                <TextInput
                  control={form.control}
                  name={`items.${index}.item_kind`}
                  label={t("itemKind")}
                  placeholder={t("itemKind")}
                  readonly={isView}
                />
                <TextInput
                  control={form.control}
                  name={`items.${index}.item_name`}
                  label={t("itemName")}
                  placeholder={t("itemName")}
                  readonly={isView}
                />
                <TextInput
                  control={form.control}
                  name={`items.${index}.unit`}
                  label={t("unit")}
                  placeholder={t("unit")}
                  readonly={isView}
                />
                <TextInput
                  control={form.control}
                  name={`items.${index}.quantity`}
                  label={t("quantity")}
                  placeholder={t("quantity")}
                  readonly={isView}
                />
                <TextInput
                  control={form.control}
                  name={`items.${index}.unit_price`}
                  label={t("unitPrice")}
                  placeholder={t("unitPrice")}
                  readonly={isView}
                />
                <TextInput
                  control={form.control}
                  name={`items.${index}.total`}
                  label={t("total")}
                  placeholder={t("total")}
                  readonly={isView}
                />
                <TextInput
                  control={form.control}
                  name={`items.${index}.description`}
                  label={t("description")}
                  placeholder={t("description")}
                  readonly={isView}
                />
              </div>
            ))}
          </div>
        </section>

        {!isView && (
          <div className="flex justify-end gap-2 mt-5 flex-col-reverse xs:flex-row">
            <CustomButton text={t("cancel")} variant="secondary" />
            <CustomButton text={t("save")} type="submit" />
          </div>
        )}
      </form>
    </Form>
  );
};

export default PurchaseRequestForm;
