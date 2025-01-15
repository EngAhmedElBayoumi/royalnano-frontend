import * as z from "zod";

export const vacationSchema = z
  .object({
    name: z.string().nonempty("Name is required"),
    job_title: z.string().nonempty("Job title is required"),
    vacation_period: z.string().nonempty("Vacation period is required"),
    from: z.date({ required_error: "From date is required" }),
    to: z.date({ required_error: "To date is required" }),
    date: z.date({ required_error: "Date is required" }),
  })
  .refine((data) => data.from < data.to, {
    message: "from date must be before to date",
    path: ["from"],
  })
  .refine(
    (data) => {
      const { from, to } = data;
      const diffInDays =
        (to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24);
      return diffInDays <= 30;
    },
    {
      message: "Vacation period cannot exceed 30 days",
      path: ["to"],
    }
  );
