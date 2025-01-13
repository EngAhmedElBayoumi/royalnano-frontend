import * as z from "zod";

export const vacationSchema = z.object({
  name: z.string().nonempty("Name is required"),
  job_title: z.string().nonempty("Job title is required"),
  vacation_period: z.string().nonempty("Vacation period is required"),
  from: z.date({ required_error: "From date is required" }),
  to: z.date({ required_error: "To date is required" }),
  date: z.date({ required_error: "Date is required" }),
});
