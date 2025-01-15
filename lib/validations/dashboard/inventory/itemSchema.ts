import * as z from "zod";

export const itemSchema = z.object({
  itemName: z.string().nonempty("Item Name is required"),
  itemCode: z.string().nonempty("Item Code is required"),
  quantity: z.number().min(0, "Quantity must be a non-negative number"),
  price: z.number().min(0, "Price must be a non-negative number"),
});
