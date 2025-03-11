import { z } from "zod";

export const EditSalesOrderSchema = z.object({
  order_date: z.string(),
  customer: z.number(),
  branch: z.number(),
  sales_representative: z.string(),
  description: z.string(),
  items: z.array(
    z
      .object({
        quantity: z.number(),
        item: z.number().nullable().optional(), 
        custom_item_name: z.string().optional(), 
        custom_price: z.string().optional(),
        discount: z.string(),
        discount_percent: z.string(),
      })
      .superRefine((data, ctx) => {
        if (data.item !== null && data.item !== undefined) {
          if (data.custom_item_name || data.custom_price) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Custom fields must be empty for existing items.",
              path: ["items"],
            });
          }
        }
        else {
          if (!data.custom_item_name || !data.custom_price) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Custom item name and price are required for custom items.",
              path: ["items"],
            });
          }
        }
      })
  ),
  status: z.string(),
});