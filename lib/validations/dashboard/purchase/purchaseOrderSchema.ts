import { z } from "zod";

// Schema for an individual item in the `items` array
const itemSchema = z.object({
  kind: z.string().min(1, "Kind is required"),
  name: z.string().min(1, "Name is required"),
  unit: z.string().min(1, "Unit is required"),
  quantity: z.number().min(0.01, "Quantity must be greater than 0"),
  unit_price: z.string().min(1, "Unit price is required"),
  bonus: z.string().optional(),
  amount: z.string().optional(),
  discount: z.string().optional(),
  discount_percent: z.string().optional(),
  vat_kd: z.string().optional(),
  total: z.string().optional(),
});

// Schema for the `invoice_detail` object
const invoiceDetailSchema = z.object({
  discount: z.string().optional(),
  vat: z.string().optional(),
  subtotal: z.string().optional(),
  quantity: z.number().min(0, "Quantity must be non-negative").optional(),
  free_quantity: z.number().min(0, "Free quantity must be non-negative").optional(),
  total: z.string().optional(),
});

// Schema for the entire form
export const purchaseOrderSchema = z.object({
  order_date: z.string().min(1, "Order date is required"),
  offer_expiry: z.string().min(1, "Offer expiry is required"),
  prefix: z.string().min(1, "Prefix is required"),
  delivery_date: z.string().min(1, "Delivery date is required"),
  due_date: z.string().min(1, "Due date is required"),
  branch: z.number().int().positive("Branch must be selected"),
  supplier: z.number().int().positive("Supplier must be selected"),
  description: z.string().optional(),
  items: z.array(itemSchema).nonempty("At least one item is required"),
  invoice_detail: invoiceDetailSchema,
});

// Type for TypeScript inference
export type PurchaseOrderFormValues = z.infer<typeof purchaseOrderSchema>;

