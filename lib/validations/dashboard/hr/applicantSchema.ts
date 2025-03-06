import * as z from "zod";
import { phoneRegex } from "@/lib/utils/phoneRegex";

export const applicantSchema = z.object({
  name: z.string().nonempty("Name is required"),
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
  phone: z
    .string()
    .nonempty("Phone number is required")
    .regex(phoneRegex, "Invalid phone number"),
  address: z.string().nonempty("Address is required"),
  birthdate: z.string().nonempty("Birthdate is required"),
  expected_salary: z.number().min(0, "Expected salary must be a positive number"),
  current_job_title: z.string().nonempty("Current job title is required"),
  current_salary: z.number().min(0, "Current salary must be a positive number"),
});
