import { z } from "zod";

export const salesOrderSchema = z.object({
  order_date: z.string().min(1, "Order date is required"),
  customer: z.number().min(1, "Customer is required"),
  branch: z.number().min(1, "Branch is required"),
  sales_representative: z.string().min(1, "Sales representative is required"),
  description: z.string().optional(),
  items: z.array(
    z.object({
      quantity: z.number().min(1, "Quantity is required"),
      item: z.number().min(1, "Item is required"),
      custom_item_name: z.string().optional(),
      custom_price: z.string().optional(),
      discount: z.string().optional(),
      discount_percent: z.string().optional(),
    })
  ),
  status: z.string().optional(),
});