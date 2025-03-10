import { z } from "zod";
import { phoneRegex } from "../utils/phoneRegex";

export const bookingValidation = z.object({
  full_name: z.string().min(1, "Full name is required"),
phone_number: z
        .string()
        .nonempty("Phone number is required")
        .regex(phoneRegex, "Invalid phone number"),
  car_type: z.string().min(1, "Car type is required"),
  car_model: z.string().min(1, "Car model is required"),
  service: z.number().min(0, "Service is required"),
  branch: z.number().min(0, "Branch is required"),
  description: z.string().optional(),
  order_note: z.string().optional(),
  status: z.string().default("pending"),
});