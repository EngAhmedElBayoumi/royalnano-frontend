import * as z from "zod";

export const clientSchema = z.object({
  client_name: z.string().nonempty("Client name is required"),
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
  phone_number: z
    .string()
    .nonempty("Phone number is required")
    .regex(
      /^\+?\d{1,3}[- ]?\d{1,4}[- ]?\d{1,4}[- ]?\d{1,9}$/,
      "Invalid phone number"
    ),
  facility_name: z.string().nonempty("Facility name is required"),
  tax_number: z.string().nonempty("Tax number is required"),
  address: z.string().nonempty("Address is required"),
  city: z.string().nonempty("City is required"),
  area: z.string().nonempty("Area is required"),
  building_number: z.string().nonempty("Building number is required"),
  website: z.string().url("Invalid website URL").optional(),
  condition: z.string().optional(),
});
