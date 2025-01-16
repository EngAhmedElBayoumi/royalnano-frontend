import * as z from "zod";

export const movementSchema = z.object({
  preorderLevel: z
    .number()
    .min(0, "Preorder level must be a non-negative number"),
  item: z.string().nonempty("Item is required"),
  quantity: z.number().min(0, "Quantity must be a non-negative number"),
  movementType: z.string().nonempty("Movement type is required"),
  date: z.date({ required_error: "Date is required" }),
});
