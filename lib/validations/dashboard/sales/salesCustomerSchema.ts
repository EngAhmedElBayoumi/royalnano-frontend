import { phoneRegex } from "@/lib/utils/phoneRegex";
import { z } from "zod";

export const SalesCustomerFormValuesSchema = z.object({
  customer_name: z.string().min(1, "Customer name is required"),
  contact_person: z.string().min(1, "Contact person is required"),
  phone_numbers: z
    .array(
      z.object({
        phone_number: z
          .string()
          .min(1, "Phone number is required")
          .max(17, "Phone number must be 17 characters or less")
          .regex(phoneRegex, "Invalid phone number"),
        description: z
          .string()
          .min(1, "Description is required")
          .max(200, "Description must be 200 characters or less"),
        id: z.number().optional(), // optional for edit mode
      })
    )
    .min(1, "At least one phone number is required"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
  notes: z.string().optional(),
  branch: z.number().int().positive("Branch ID must be a positive integer"),
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
  assigned_to: z.number().nullable(),
  recommended_by: z.number().nullable(),

  // ✅ New fields for attachments
  attachments: z
    .array(
      z.object({
        description: z.string().min(1, "Attachment description is required"),
        file: z.string().url("Invalid file URL"),
        id: z.number().optional(), // optional for edit mode
      })
    )
    .optional(),

  attachments_data: z.string().optional(),

  phone_numbers_data: z.string().optional(),
});

export type SalesCustomerFormValues = z.infer<
  typeof SalesCustomerFormValuesSchema
>;
