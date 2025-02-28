import * as z from "zod";

export const bonusSchema = z.object({
  employee: z.coerce.number().min(1, "Employee must be selected"),
  amount: z.string().nonempty("Amount is required"),
  reason: z.string().nonempty("Reason is required"),
  type: z.enum(["bonus", "deduction"]),
  date: z.date({ required_error: "Date is required" }),
});
