import { phoneRegex } from "@/lib/utils/phoneRegex";
import { z } from "zod";

export const SalesCustomerFormValuesSchema = z.object({
  customer_name: z.string().min(1, "Customer name is required"),
  contact_person: z.string().min(1, "Contact person is required"),
  id: z.number().int().positive("ID must be a positive integer"),

  phone_number: z
        .string()
        .nonempty("Phone number is required")
        .regex(phoneRegex, "Invalid phone number"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
  notes: z.string().optional(),
  branch: z.number().int().positive("Branch ID must be a positive integer"),
  customer_type: z.enum(["individual", "business"]),
  tax_number: z.string().min(1, "Tax number is required"),
  national_id: z.string().min(1, "National ID is required"),
});

export type SalesCustomerFormValues = z.infer<typeof SalesCustomerFormValuesSchema>;