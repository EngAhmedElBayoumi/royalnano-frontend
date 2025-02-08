import * as z from "zod";

export const categorySchema = z.object({
  name: z.string().nonempty("Category name is required"),
  // itemCode: z.string().nonempty("Item code is required"),
  // quantity: z.number().min(0, "Quantity must be a non-negative number"),
});
