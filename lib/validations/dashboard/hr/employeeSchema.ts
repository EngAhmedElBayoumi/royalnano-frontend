import * as z from "zod";
import { phoneRegex } from "@/lib/utils/phoneRegex";

export const employeeSchema = z.object({
  name: z.string().nonempty("Name is required"),
  phone_number: z
    .string()
    .nonempty("Phone number is required")
    .regex(phoneRegex, "Invalid phone number"),
  address: z.string().nonempty("Address is required"),
  job_title: z.string().nonempty("Job title is required"),
  email: z.string().email("Invalid email address"),
  date: z.date({ required_error: "Date is required" }),
  salary: z.string().nonempty("Salary is required"),
  permissions: z.array(z.string()).optional(),
});
