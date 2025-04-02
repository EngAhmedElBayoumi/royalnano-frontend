import * as z from "zod";

export const vacationSchema = z
  .object({
    employee: z.string().nonempty("Employee is required"),
    status: z.string().nonempty("status is required"),
    reason: z.string().nonempty("reasons is required"),
    start_date: z.date({ required_error: "start date is required" }),
    end_date: z.date({ required_error: "End date is required" }),
  })
  .refine((data) => data.start_date < data.end_date, {
    message: "start date must be before end date",
    path: ["start_date"],
  })
  .refine(
    (data) => {
      const { start_date, end_date } = data;
      const diffInDays =
        (end_date.getTime() - start_date.getTime()) / (1000 * 60 * 60 * 24);
      return diffInDays <= 30;
    },
    {
      message: "Vacation period cannot exceed 30 days",
      path: ["end_date"],
    }
  );
