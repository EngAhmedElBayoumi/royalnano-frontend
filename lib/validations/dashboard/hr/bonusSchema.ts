import * as z from "zod";

export const bonusSchema = z.object({
  employee: z.coerce.number().min(1, "Employee must be selected"),
  amount: z.number().min(1, "Amount should be positive number"),
  reason: z.string().nonempty("Reason is required"),
  type: z.enum(["bonus", "deduction"]),
  date: z.string().nonempty("Date is required"),
});
