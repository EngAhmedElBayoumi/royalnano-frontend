import { z } from "zod";

const itemSchema = z.object({
  item: z.number().int().positive("Item must be selected"),
  quantity: z.number().min(0.01, "Quantity must be greater than 0"),
  unit_price: z.string().min(1, "Unit price is required"),
  discount: z.string().optional(),
  tax: z.string().optional(),
  total: z.string().optional(),
});

export const purchaseInvoiceSchema = z.object({
  voucher_date: z.string().min(1, "Voucher date is required"),
  warehouse: z.number().int().positive("Warehouse must be selected"),
  prefix: z.string().min(1, "Prefix is required"),
  close_kind: z.string().min(1, "Close kind is required"),
  due_date: z.string().min(1, "Due date is required"),
  branch: z.number().int().positive("Branch must be selected"),
  supplier: z.number().int().positive("Supplier must be selected"),
  purchase_order: z.number().int().positive().optional(),
  description: z.string().optional(),
  status: z.string().min(1, "Status is required"),
  items: z.array(itemSchema).nonempty("At least one item is required"),
});

export type PurchaseInvoiceFormValues = z.infer<typeof purchaseInvoiceSchema>;

