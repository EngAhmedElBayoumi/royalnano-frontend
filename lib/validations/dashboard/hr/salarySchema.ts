import * as z from "zod";

export const salarySchema = z.object({
  name: z.string().nonempty("Name is required"),
  job_title: z.string().nonempty("Job title is required"),
  salary: z.string().nonempty("Salary is required"),
  date: z.date({ required_error: "Date is required" }),
});
