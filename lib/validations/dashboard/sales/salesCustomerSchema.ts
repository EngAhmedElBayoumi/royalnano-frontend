// import { phoneRegex } from "@/lib/utils/phoneRegex";
import { z } from "zod";

export const SalesCustomerFormValuesSchema = z.object({
  customer_name: z.string().min(1, "Customer name is required"),
  contact_person: z.string().min(1, "Contact person is required"),

  // بإمكانك تجاهل التحقق التفصيلي هنا لأنك سترسلين كـ JSON string
  phone_numbers: z.any().optional(),

  email: z.string().email("Invalid email address"),
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

  attachments: z.any().optional(),
  attachments_data: z.string().optional(),
  phone_numbers_data: z.string().optional(),
});

export type SalesCustomerFormValues = z.infer<
  typeof SalesCustomerFormValuesSchema
>;
