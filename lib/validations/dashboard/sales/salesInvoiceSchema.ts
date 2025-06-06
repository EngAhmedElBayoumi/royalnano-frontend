import { z } from "zod";

export const salesInvoiceSchema = z.object({
  invoice_date: z.string().min(1, "Required"),
  due_date: z.string().min(1, "Required"),
  sales_representative: z.string().min(1, "Required"),
  total_amount: z.coerce.number().nonnegative(),
  status: z.string().min(1, "Required"),
  description: z.string().optional(),
  sales_order: z.coerce.number().nonnegative(),
  customer: z.coerce.number().nonnegative(),
  branch: z.coerce.number().nonnegative(),

  items: z
    .array(
      z.object({
        quantity: z.coerce.number().positive(),
        sales_invoice: z.coerce.number().optional(),
        unit_price: z.string(),
        discount: z.string(),
        discount_percent: z.string(),
        total: z.string(),
        // item: z.coerce.number().positive(),
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
