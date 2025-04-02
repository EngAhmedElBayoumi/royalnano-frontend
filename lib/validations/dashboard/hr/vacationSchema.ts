import * as z from "zod";

export const vacationSchema = z
  .object({
    employee: z.string().nonempty("Employee is required"),
    status: z.string().nonempty("status is required"),
    reason: z.string().nonempty("reasons is required"),
    start_date: z.date({ required_error: "start date is required" }),
    to: z.date({ required_error: "To date is required" }),
  })
  .refine((data) => data.start_date < data.to, {
    message: "start date must be before to date",
    path: ["start_date"],
  })
  .refine(
    (data) => {
      const { start_date, to } = data;
      const diffInDays =
        (to.getTime() - start_date.getTime()) / (1000 * 60 * 60 * 24);
      return diffInDays <= 30;
    },
    {
      message: "Vacation period cannot exceed 30 days",
      path: ["to"],
    }
  );
