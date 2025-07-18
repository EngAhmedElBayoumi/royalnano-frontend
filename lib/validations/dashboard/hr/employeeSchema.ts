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
  salary: z.number().min(1, "Salary must be a positive number"),
  address: z.string().nonempty("Address is required"),
  branch: z.string().nonempty("Branch must be selected"),
  department: z.string().nonempty("Department must be selected"),
  leader: z.string().optional(),
  password: z.string().nonempty("Password is required"),
  is_user: z.boolean(),
  custom_permissions: z
    .array(z.coerce.number().min(1, "At least one permission is required"))
    .min(1, "At least one permission is required"),
});

export const employeeSchemaWithOptionalPassword = employeeSchema.extend({
  password: z.string().optional(),
});
export type EmployeeSchemaDTO = z.infer<typeof employeeSchema>;
export type EmployeeSchemaWithOptionalPasswordDTO = z.infer<
  typeof employeeSchemaWithOptionalPassword
>;
