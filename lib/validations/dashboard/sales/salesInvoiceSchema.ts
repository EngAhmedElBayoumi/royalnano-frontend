import { z } from "zod";

export const salesInvoiceSchema = z.object({
  invoice_date: z.string().min(1, "Required"),
  due_date: z.string().min(1, "Required"),
  sales_representative: z.string().min(1, "Required"),
  total_amount: z.coerce.number().nonnegative(),
  status: z.string().min(1, "Required"),
  description: z.string().optional(),
  quotation: z.coerce.number().nonnegative(), // تعديل هنا
  customer: z.coerce.number().nonnegative(),
  branch: z.coerce.number().nonnegative(),
  invoice_number: z.string().min(1),
  created_at: z.string().min(1),
  extra_fields: z.record(z.string(), z.string()).optional(),
  id: z.coerce.number().optional(),

  items: z
    .array(
      z.object({
        id: z.coerce.number().optional(),
        quantity: z.coerce.number().positive(),
        unit_price: z.string(),
        discount: z.string(),
        discount_percent: z.string(),
        total: z.string(),
        item: z.string(),
        custom_item_name: z.string().optional(),
        extra_fields: z.record(z.string(), z.string()).optional(),
      })
    )
    .min(1, "At least one item is required"),

  consumed_items: z
    .array(
      z.object({
        inventory_item: z.coerce.number().positive(),
        quantity: z.coerce.number().positive(),
        sales_invoice: z.coerce.number().optional(),
        id: z.coerce.number().optional(),
      })
    )
    .optional(),
});
