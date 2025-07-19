import { z } from "zod";

// Schema for an individual item in the `items` array
const itemSchema = z.object({
  kind: z.coerce.number().min(1, "Kind must be selected"),
  name: z.string().min(1, "Name is required"),
  unit: z.coerce.number().min(1, "Unit must be selected"),
  quantity: z.number().min(1, "Quantity must be greater than 0"),
  unit_price: z.number().min(0.01, "Unit price must be greater than 0"),
  bonus: z.number().min(0, "Bonus must be non-negative").optional(),
  amount: z.number().min(0, "Amount must be non-negative").optional(),
  discount: z.number().min(0, "Discount must be non-negative").optional(),
  discount_percent: z
    .number()
    .min(0, "Discount percent must be non-negative")
    .optional(),
  vat_kd: z.number().min(0, "VAT KD must be non-negative").optional(),
  total: z.number().min(0, "Total must be non-negative").optional(),
});

// Schema for the `invoice_detail` object
const invoiceDetailSchema = z.object({
  discount: z.number().min(0, "Discount must be non-negative").optional(),
  vat: z.number().min(0, "VAT must be non-negative").optional(),
  subtotal: z.number().min(0, "Subtotal must be non-negative").optional(),
  quantity: z.number().min(0, "Quantity must be non-negative").optional(),
  free_quantity: z
    .number()
    .min(0, "Free quantity must be non-negative")
    .optional(),
  total: z.number().min(0, "Total must be non-negative").optional(),
});

// Schema for the entire form
export const purchaseOrderSchema = z.object({
  order_date: z.string().min(1, "Order date is required"),
  offer_expiry: z.string().min(1, "Offer expiry is required"),
  prefix: z.string().min(1, "Prefix is required"),
  delivery_date: z.string().min(1, "Delivery date is required"),
  due_date: z.string().min(1, "Due date is required"),
  branch: z.coerce.number().min(1, "Branch must be selected"),
  supplier: z.coerce.number().min(1, "Supplier must be selected"),
  description: z.string().optional(),
  items: z.array(itemSchema).nonempty("At least one item is required"),
  invoice_detail: invoiceDetailSchema,
});

// Type for TypeScript inference
export type PurchaseOrderFormValues = z.infer<typeof purchaseOrderSchema>;
