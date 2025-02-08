import * as z from "zod";

export const itemSchema = z.object({
  item_name: z.string().nonempty("Item Name is required"),
  item_code: z.string().nonempty("Item Code is required"),
  quantity: z.number().min(0, "Quantity must be a non-negative number"),
  category: z.coerce.number().min(0, "Category must be be selected"),
  unit: z.string().nonempty("Unit is required"),
  purchase_price: z
    .number()
    .min(0, "Purchase price must be a non-negative number"),
  selling_price: z
    .number()
    .min(0, "Selling price must be a non-negative number"),
  branch: z.coerce.number().min(1, "Branch must be be selected"),
  supplier: z.coerce.number().min(1, "Supplier must be be selected"),
  description: z.string().nonempty("Description is required"),
});
