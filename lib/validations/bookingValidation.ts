import * as z from "zod";

export const bookingValidation = z.object({
  full_name: z.string().nonempty("Full name is required").min(3),

  car_type: z.string().nonempty("Car type is required").min(3),

  service: z.string().nonempty("Service is required").min(3),

  additional_notes: z.string().optional(),

  branch: z.string().nonempty("Branch is required"),

  car_model: z.string().nonempty("Car model is required"),

  phone_number: z
    .string()
    .regex(/^01[0125]\d{8}$/, "Invalid Egyptian phone number")
    .nonempty("Phone number is required"),

  order_notes: z.string().optional(),
});
