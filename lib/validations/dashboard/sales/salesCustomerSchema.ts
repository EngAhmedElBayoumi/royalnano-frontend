// import { phoneRegex } from "@/lib/utils/phoneRegex";
import { z } from "zod";
export const SalesCustomerFormValuesSchema = z.object({
  customer_name: z.string().min(1, "Customer name is required"),
  contact_person: z.string().min(1, "Contact person is required"),

  phone_numbers: z.any().optional(),
  phone_numbers_data: z.string().optional(),

  email: z.string().email("Invalid email address"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
  notes: z.string().optional(),

  branch: z.coerce
    .number()
    .int()
    .positive("Branch ID must be a positive integer"),

  customer_type: z.enum(["individual", "company"]), // <-- عدلتها عشان backend enum مكتوب كده

  tax_number: z.string().optional(), // <-- لأنها nullable على الباك اند
  national_id: z.string().optional(),

  extra_fields: z.record(z.any()).optional(),

  source: z.enum([
    "facebook",
    "instagram",
    "tiktok",
    "twitter",
    "recommendation",
    "other",
  ]),

  assigned_to: z.coerce.number().nullable().optional(),
  recommended_by: z.coerce.number().nullable().optional(), // <== مهمة جدًا
});

export type SalesCustomerFormValues = z.infer<
  typeof SalesCustomerFormValuesSchema
>;
