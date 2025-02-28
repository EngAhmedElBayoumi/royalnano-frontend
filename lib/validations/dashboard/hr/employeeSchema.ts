import * as z from "zod";
import { phoneRegex } from "@/lib/utils/phoneRegex";

export const employeeSchema = z.object({
  name: z.string().nonempty("Name is required"),
  email_address: z.string().email("Invalid email address"),
  phone: z
    .string()
    .nonempty("Phone number is required")
    .regex(phoneRegex, "Invalid phone number"),
  job_title: z.string().nonempty("Job title is required"),
  salary: z.string().nonempty("Salary is required"),
  address: z.string().nonempty("Address is required"),
  branch: z.coerce.number().min(1, "Branch must be selected"),
  department: z.coerce.number().min(1, "Department must be selected"),
  password: z.string().nonempty("Password is required"),
  is_user: z.boolean(),
  // permissions: z.array(z.string()).optional(),
});
