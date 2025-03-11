import { z } from "zod";

export const salesOrderSchema = z.object({
  order_date: z.string(),
  customer: z.number(),
  branch: z.number(),
  sales_representative: z.string(),
  description: z.string(),
  items: z.array(
    z.object({
      quantity: z.number(),
      item: z.number().nullable().optional(), 
      custom_item_name: z.string().optional(),
      custom_price: z.string().optional(), 
      discount: z.string(),
      discount_percent: z.string(),
    })
    .refine(
      (data) => data.item !== null || (data.custom_item_name && data.custom_price),
      "You must either select an item or provide a custom item name and price."
    )
  ),
  status: z.string(),
});