import { z } from "zod";

// Schema for an individual item in the `items` array
const itemSchema = z.object({
  kind: z.string().min(1, "Kind is required"),
  name: z.string().min(1, "Name is required"),
  unit: z.string().min(1, "Unit is required"),
  quantity: z.string().min(1, "Quantity is required"),
  unit_price: z.string().min(1, "Unit price is required"),
  id: z.number().int().positive("ID must be a positive integer"),
  bonus: z.string().min(1, "Bonus is required"),
  amount: z.string().min(1, "Amount is required"),
  discount: z.string().min(1, "Discount is required"),
  discount_percent: z.string().min(1, "Discount percent is required"),
  vat_kd: z.string().min(1, "VAT KD is required"),
  total: z.string().min(1, "Total is required"),
});

// Schema for the `invoice_detail` object
const invoiceDetailSchema = z.object({
  discount: z.string().min(1, "Discount is required"),
  vat: z.string().min(1, "VAT is required"),
  subtotal: z.string().min(1, "Subtotal is required"),
  quantity: z.string().min(1, "Quantity is required"),
  free_quantity: z.string().min(1, "Free quantity is required"),
  total: z.string().min(1, "Total is required"),
});

// Schema for the entire form
export const purchaseOrderSchema = z.object({
  order_date: z.string().min(1, "Order date is required"),
  offer_expiry: z.string().min(1, "Offer expiry is required"),
  prefix: z.string().min(1, "Prefix is required"),
  delivery_date: z.string().min(1, "Delivery date is required"),
  due_date: z.string().min(1, "Due date is required"),
  id: z.number().int().positive("ID must be a positive integer"),
  branch: z.number().int().positive("Branch must be a positive integer"),
  supplier: z.number().int().positive("Supplier must be a positive integer"),
  description: z.string().min(1, "Description is required"),
  items: z.array(itemSchema).nonempty("At least one item is required"),
  invoice_detail: invoiceDetailSchema,
});

// Type for TypeScript inference
export type PurchaseOrderFormValues = z.infer<typeof purchaseOrderSchema>;