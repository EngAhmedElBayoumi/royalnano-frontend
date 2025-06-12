import { z } from "zod";

// Phone number item schema
const PhoneNumberSchema = z.object({
  phone_number: z.string().min(1, "Phone number is required"),
  description: z.string().optional(),
  id: z.number().optional(), // Added to match your Postman payload
});

export const SalesCustomerFormValuesSchema = z.object({
  id: z.number().optional(), // Added to match your Postman payload
  customer_name: z.string().min(1, "Customer name is required"),
  contact_person: z.string().min(1, "Contact person is required"),

  // Updated phone_numbers to use the array of PhoneNumberSchema
  phone_numbers: z.array(PhoneNumberSchema).optional(),

  email: z.string().email("Invalid email address").optional(), // Made optional if your API accepts it
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
  notes: z.string().optional(),

  branch: z.coerce
    .number()
    .int()
    .positive("Branch ID must be a positive integer"),

  customer_type: z.enum(["individual", "business"]),
  tax_number: z.string().min(1, "Tax number is required"),
  national_id: z.string().min(1, "National ID is required"),
  extra_fields: z.record(z.any()).optional(),

  source: z.enum([
    "facebook",
    "instagram",
    "tiktok",
    "twitter",
    "recommendation",
    "other",
  ]),

  assigned_to: z.coerce.number().nullable(),
  recommended_by: z.coerce.number().nullable(),
  phone_number: z.string().optional(), // Main phone number
  attachments: z.array(z.any()).optional(), // Made more specific as array
  attachments_data: z.string().optional(),
  phone_numbers_data: z.string().optional(),
});

export type SalesCustomerFormValues = z.infer<
  typeof SalesCustomerFormValuesSchema
>;
