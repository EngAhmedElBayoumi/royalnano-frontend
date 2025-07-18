import * as z from "zod";

export const itemSchema = z.object({
  item_name: z.string().nonempty("Item Name is required"),
  item_code: z.string().nonempty("Item Code is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  unit: z.coerce.number().min(1, "Unit must be selected"),
  branch: z.coerce.number().min(1, "Branch must be selected"),
  category: z.coerce.number().min(1, "Category must be selected"),
  supplier: z.coerce.number().nullable().optional(),
  purchase_price: z
    .number()
    .min(0, "Purchase price must be a non-negative number"),
  selling_price: z
    .number()
    .min(0, "Selling price must be a non-negative number"),
  description: z.string().nonempty("Description is required"),
  extra_fields: z.record(z.any()).optional(),
});
