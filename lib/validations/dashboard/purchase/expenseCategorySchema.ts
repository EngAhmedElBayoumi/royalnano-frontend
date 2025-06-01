import { z } from "zod";

export const expenseCategorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
});

export type ExpenseCategoryFormValues = z.infer<typeof expenseCategorySchema>;
