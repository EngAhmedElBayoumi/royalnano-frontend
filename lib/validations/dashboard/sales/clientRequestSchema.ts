import { phoneRegex } from "@/lib/utils/phoneRegex";
import { z } from "zod";

export const clientRequestSchema = z.object({
  full_name: z.string().min(1, "Full name is required"), 
 phone_number: z
         .string()
         .nonempty("Phone number is required")
         .regex(phoneRegex, "Invalid phone number"),
  car_type: z.string().min(1, "Car type is required"),
  car_model: z.string().min(1, "Car model is required"), 
  status: z.string().min(1, "Status is required"), 
  description: z.string().min(1, "Description is required"),
  order_note: z.string().min(1, "Order note is required"), 
  service: z.number().min(1, "Service is required"),
  branch: z.number().min(1, "Branch is required"), 
});

export type ClientRequestFormValues = z.infer<typeof clientRequestSchema>;