"use client";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomButton from "@/components/formFields/CustomButton";
import TextInput from "@/components/formFields/TextInput";
import CustomSelect from "@/components/formFields/CustomSelect";
import DatePicker from "@/components/formFields/DatePicker";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { purchaseInvoiceSchema } from "@/lib/validations/dashboard/purchase/purchaseInvoiceSchema";
import { useGetBranchesQuery } from "@/redux/services/dashboard/inventory/branchesApi";
import { useGetSuppliersQuery } from "@/redux/services/dashboard/purchase/supplierApi";
import { useGetWarehousesQuery } from "@/redux/services/dashboard/purchase/warehouseApi";
import { useGetOrdersQuery } from "@/redux/services/dashboard/purchase/orderApi";
import { useGetItemsQuery } from "@/redux/services/dashboard/inventory/itemsApi";
import { useEffect, useState } from "react";

interface PurchaseInvoiceFormProps {
  onSubmit: (data: PurchaseInvoiceFormValues) => Promise<void>;
  defaultValues?: PurchaseInvoiceFormValues;
  isView?: boolean;
}

export interface PurchaseInvoiceFormValues {
  voucher_date: string;
  warehouse: number;
  prefix: string;
  close_kind: string;
  due_date: string;
  branch: number;
  supplier: number;
  purchase_order?: number;
  description: string;
  status: string;
  items: {
    item: number;
    quantity: number;
    unit_price: string;
    discount: string;
    tax: string;
    total: string;
  }[];
}

const PurchaseInvoiceForm = ({
  onSubmit,
  defaultValues,
  isView = false,
}: PurchaseInvoiceFormProps) => {
  const [inventoryItems, setInventoryItems] = useState<{ value: string; label: string }[]>([]);

  const form = useForm<PurchaseInvoiceFormValues>({
    resolver: zodResolver(purchaseInvoiceSchema),
    defaultValues: defaultValues || {
      voucher_date: "",
      warehouse: 0,
      prefix: "",
      close_kind: "",
      due_date: "",
      branch: 0,
      supplier: 0,
      purchase_order: 0,
      description: "",
      status: "pending",
      items: [
        {
          item: 0,
          quantity: 1,
          unit_price: "",
          discount: "",
          tax: "",
          total: "",
        },
      ],
    },
  });

  const t = useTranslations("Purchase.Invoice");
  const { data: branchesData } = useGetBranchesQuery({});
  const { data: suppliersData } = useGetSuppliersQuery({});
  const { data: warehousesData } = useGetWarehousesQuery({});
  const { data: ordersData } = useGetOrdersQuery({});
  const { data: itemsData, isError, error } = useGetItemsQuery({});

  const branchOptions = branchesData?.results?.map((branch: any) => ({
    label: branch.name,
    value: branch.id.toString(),
  })) || [];

  const supplierOptions = suppliersData?.results?.map((supplier: any) => ({
    label: supplier.supplier_name,
    value: supplier.id.toString(),
  })) || [];

  const warehouseOptions = warehousesData?.results?.map((warehouse: any) => ({
    label: warehouse.name,
    value: warehouse.id.toString(),
  })) || [];

  const orderOptions = ordersData?.results?.map((order: any) => ({
    label: `${order.prefix} - ${order.supplier?.supplier_name || "No Supplier"}`,
    value: order.id.toString(),
  })) || [];

  const statusOptions = [
    { value: "draft", label: "Draft" },
    { value: "pending", label: "Pending" },
    { value: "approved", label: "Approved" },
    { value: "paid", label: "Paid" },
    { value: "cancelled", label: "Cancelled" },
  ];

  const closeKindOptions = [
    { value: "full", label: "Full Close" },
    { value: "partial", label: "Partial Close" },
    { value: "pending", label: "Pending" },
  ];

  // Set inventory items from itemsApi
  useEffect(() => {
    if (itemsData?.results) {
      setInventoryItems(
        itemsData.results.map((item: any) => ({
          value: item.id.toString(),
          label: `${item.item_code} - ${item.item_name}`,
        })) || []
      );
    }
  }, [itemsData]);

  // Handle error if items fetch fails
  useEffect(() => {
    if (isError) {
      console.error("Error fetching inventory items:", error);
    }
  }, [isError, error]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <section className="min-h-[60vh]">
          <div className="grid sm:grid-cols-2 gap-x-4 gap-y-2 xl:gap-y-5 lg:gap-x-10">
            <DatePicker
              control={form.control}
              name="voucher_date"
              label={t("voucherDate")}
              placeholder={t("voucherDate")}
              readonly={isView}
            />
            <CustomSelect
              control={form.control}
              name="warehouse"
              label={t("warehouse")}
              placeholder={t("warehouse")}
              options={warehouseOptions}
              readonly={isView}
              valueType="number"
            />
            <TextInput
              control={form.control}
              name="prefix"
              label={t("prefix")}
              placeholder={t("prefix")}
              readonly={isView}
            />
            <CustomSelect
              control={form.control}
              name="close_kind"
              label={t("closeKind")}
              placeholder={t("closeKind")}
              options={closeKindOptions}
              readonly={isView}
            />
            <DatePicker
              control={form.control}
              name="due_date"
              label={t("dueDate")}
              placeholder={t("dueDate")}
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
              name="supplier"
              label={t("supplier")}
              placeholder={t("supplier")}
              options={supplierOptions}
              readonly={isView}
              valueType="number"
            />
            <CustomSelect
              control={form.control}
              name="purchase_order"
              label={t("purchaseOrder")}
              placeholder={t("purchaseOrder")}
              options={orderOptions}
              readonly={isView}
              valueType="number"
            />
            <CustomSelect
              control={form.control}
              name="status"
              label={t("status")}
              placeholder={t("status")}
              options={statusOptions}
              readonly={isView}
            />
            <TextInput
              control={form.control}
              name="description"
              label={t("description")}
              placeholder={t("description")}
              readonly={isView}
            />
          </div>

          {/* Items Array */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">{t("items")}</h3>
            {form.watch("items")?.map((item, index) => (
              <div
                key={index}
                className="grid sm:grid-cols-2 gap-x-4 gap-y-2 xl:gap-y-5 lg:gap-x-10 mb-4 p-4 border rounded-lg"
              >
                <CustomSelect
                  control={form.control}
                  name={`items.${index}.item`}
                  label={t("item")}
                  placeholder={t("item")}
                  options={inventoryItems}
                  readonly={isView}
                  valueType="number"
                />
                <TextInput
                  control={form.control}
                  name={`items.${index}.quantity`}
                  label={t("quantity")}
                  placeholder={t("quantity")}
                  readonly={isView}
                  type="number"
                />
                <TextInput
                  control={form.control}
                  name={`items.${index}.unit_price`}
                  label={t("unitPrice")}
                  placeholder={t("unitPrice")}
                  readonly={isView}
                  type="number"
                />
                <TextInput
                  control={form.control}
                  name={`items.${index}.discount`}
                  label={t("discount")}
                  placeholder={t("discount")}
                  readonly={isView}
                  type="number"
                />
                <TextInput
                  control={form.control}
                  name={`items.${index}.tax`}
                  label={t("tax")}
                  placeholder={t("tax")}
                  readonly={isView}
                  type="number"
                />
                <TextInput
                  control={form.control}
                  name={`items.${index}.total`}
                  label={t("total")}
                  placeholder={t("total")}
                  readonly={true}
                  type="number"
                />
              </div>
            ))}
          </div>
        </section>

        {!isView && (
          <div className="flex justify-end gap-2 mt-5 flex-col-reverse xs:flex-row">
            <Link href="/dashboard/purchase?tab=invoice" passHref>
              <CustomButton text={t("cancel")} variant="secondary" />
            </Link>
            <CustomButton text={t("save")} type="submit" />
          </div>
        )}
      </form>
    </Form>
  );
};

export default PurchaseInvoiceForm;
