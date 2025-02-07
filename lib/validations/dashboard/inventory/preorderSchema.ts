import * as z from "zod";

export const preorderSchema = z.object({
  preorder_level: z
    .number()
    .min(0, "Preorder level must be a non-negative number"),
  // item: z.number(),
  item: z.coerce.number().min(1, "Item must be selected"), 
  description: z.string().optional(),
});
