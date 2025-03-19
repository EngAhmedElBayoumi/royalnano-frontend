"use client";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomButton from "@/components/formFields/CustomButton";
import TextInput from "@/components/formFields/TextInput";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { purchaseOrderSchema } from "@/lib/validations/dashboard/purchase/purchaseOrderSchema";

interface PurchaseOrderFormProps {
  onSubmit: (data: PurchaseOrderFormValues) => Promise<void>;
  defaultValues?: PurchaseOrderFormValues;
}

export interface PurchaseOrderFormValues {
  order_date: string;
  offer_expiry: string;
  prefix: string;
  delivery_date: string;
  due_date: string;
  id: number;
  branch: number;
  supplier: number;
  description: string;
  items: {
    kind: string;
    name: string;
    unit: string;
    quantity: string;
    unit_price: string;
    id: number;
    bonus: string;
    amount: string;
    discount: string;
    discount_percent: string;
    vat_kd: string;
    total: string;
  }[];
  invoice_detail: {
    discount: string;
    vat: string;
    subtotal: string;
    quantity: string;
    free_quantity: string;
    total: string;
  };
}

const PurchaseOrderForm = ({ onSubmit, defaultValues }: PurchaseOrderFormProps) => {
  const form = useForm<PurchaseOrderFormValues>({
    resolver: zodResolver(purchaseOrderSchema),
    defaultValues: defaultValues || {
      order_date: "",
      offer_expiry: "",
      prefix: "",
      delivery_date: "",
      due_date: "",
      id: 0,
      branch: 0,
      supplier: 0,
      description: "",
      items: [
        {
          kind: "",
          name: "",
          unit: "",
          quantity: "",
          unit_price: "",
          id: 0,
          bonus: "",
          amount: "",
          discount: "",
          discount_percent: "",
          vat_kd: "",
          total: "",
        },
      ],
      invoice_detail: {
        discount: "",
        vat: "",
        subtotal: "",
        quantity: "",
        free_quantity: "",
        total: "",
      },
    },
  });

  const t = useTranslations("Purchase.Order");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <section className="min-h-[60vh]">
          {/* Top-Level Fields */}
          <div className="grid sm:grid-cols-2 gap-x-4 gap-y-2 xl:gap-y-5 lg:gap-x-10">
            <TextInput
              control={form.control}
              name="order_date"
              label={t("orderDate")}
              placeholder={t("orderDate")}
            />
            <TextInput
              control={form.control}
              name="offer_expiry"
              label={t("offerExpiry")}
              placeholder={t("offerExpiry")}
            />
            <TextInput
              control={form.control}
              name="prefix"
              label={t("prefix")}
              placeholder={t("prefix")}
            />
            <TextInput
              control={form.control}
              name="delivery_date"
              label={t("deliveryDate")}
              placeholder={t("deliveryDate")}
            />
            <TextInput
              control={form.control}
              name="due_date"
              label={t("dueDate")}
              placeholder={t("dueDate")}
            />
            <TextInput
              control={form.control}
              name="id"
              label={t("id")}
              placeholder={t("id")}
              type="number"
            />
            <TextInput
              control={form.control}
              name="branch"
              label={t("branch")}
              placeholder={t("branch")}
              type="number"
            />
            <TextInput
              control={form.control}
              name="supplier"
              label={t("supplier")}
              placeholder={t("supplier")}
              type="number"
            />
            <TextInput
              control={form.control}
              name="description"
              label={t("description")}
              placeholder={t("description")}
            />
          </div>

          {/* Items Array */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">{t("items")}</h3>
            {form.watch("items")?.map((item, index) => (
              <div key={index} className="grid sm:grid-cols-2 gap-x-4 gap-y-2 xl:gap-y-5 lg:gap-x-10">
                <TextInput
                  control={form.control}
                  name={`items.${index}.kind`}
                  label={t("kind")}
                  placeholder={t("kind")}
                />
                <TextInput
                  control={form.control}
                  name={`items.${index}.name`}
                  label={t("name")}
                  placeholder={t("name")}
                />
                <TextInput
                  control={form.control}
                  name={`items.${index}.unit`}
                  label={t("unit")}
                  placeholder={t("unit")}
                />
                <TextInput
                  control={form.control}
                  name={`items.${index}.quantity`}
                  label={t("quantity")}
                  placeholder={t("quantity")}
                />
                <TextInput
                  control={form.control}
                  name={`items.${index}.unit_price`}
                  label={t("unitPrice")}
                  placeholder={t("unitPrice")}
                />
                <TextInput
                  control={form.control}
                  name={`items.${index}.bonus`}
                  label={t("bonus")}
                  placeholder={t("bonus")}
                />
                <TextInput
                  control={form.control}
                  name={`items.${index}.amount`}
                  label={t("amount")}
                  placeholder={t("amount")}
                />
                <TextInput
                  control={form.control}
                  name={`items.${index}.discount`}
                  label={t("discount")}
                  placeholder={t("discount")}
                />
                <TextInput
                  control={form.control}
                  name={`items.${index}.discount_percent`}
                  label={t("discountPercent")}
                  placeholder={t("discountPercent")}
                />
                <TextInput
                  control={form.control}
                  name={`items.${index}.vat_kd`}
                  label={t("vatKd")}
                  placeholder={t("vatKd")}
                />
                <TextInput
                  control={form.control}
                  name={`items.${index}.total`}
                  label={t("total")}
                  placeholder={t("total")}
                />
              </div>
            ))}
          </div>

          {/* Invoice Detail */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">{t("invoiceDetail")}</h3>
            <div className="grid sm:grid-cols-2 gap-x-4 gap-y-2 xl:gap-y-5 lg:gap-x-10">
              <TextInput
                control={form.control}
                name="invoice_detail.discount"
                label={t("discount")}
                placeholder={t("discount")}
              />
              <TextInput
                control={form.control}
                name="invoice_detail.vat"
                label={t("vat")}
                placeholder={t("vat")}
              />
              <TextInput
                control={form.control}
                name="invoice_detail.subtotal"
                label={t("subtotal")}
                placeholder={t("subtotal")}
              />
              <TextInput
                control={form.control}
                name="invoice_detail.quantity"
                label={t("quantity")}
                placeholder={t("quantity")}
              />
              <TextInput
                control={form.control}
                name="invoice_detail.free_quantity"
                label={t("freeQuantity")}
                placeholder={t("freeQuantity")}
              />
              <TextInput
                control={form.control}
                name="invoice_detail.total"
                label={t("total")}
                placeholder={t("total")}
              />
            </div>
          </div>
        </section>

        {/* Buttons */}
        <div className="flex justify-end gap-2 mt-5">
          <Link
            href={`/dashboard/inventory?tab=${t("Inventory.purchaseOrderModel")}`}
            passHref
          >
            <CustomButton
              text={t("cancel")}
              className="text-white rounded-lg bg-secondary min-w-[160px] xl:min-w-[222px] font-bold text-sm xl:text-[20px]"
            />
          </Link>
          <CustomButton
            text={t("save")}
            className="text-white rounded-lg min-w-[160px] xl:min-w-[222px] font-bold text-sm xl:text-[20px]"
          />
        </div>
      </form>
    </Form>
  );
};

export default PurchaseOrderForm;