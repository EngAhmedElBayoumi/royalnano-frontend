// import { phoneRegex } from "@/lib/utils/phoneRegex";
import { z } from "zod";
export const SalesCustomerFormValuesSchema = z.object({
  customer_name: z.string().min(1, "Customer name is required"),
  contact_person: z.string().min(1, "Contact person is required"),

  phone_numbers: z.any().optional(),

  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  address: z.string().optional().or(z.literal("")),
  city: z.string().optional().or(z.literal("")),
  country: z.string().optional().or(z.literal("")),
  branch: z.coerce.number().int().positive("Branch ID must be a positive integer").nullable().optional(),
  customer_type: z.enum(["individual", "company"]).optional(),
  source: z.enum([
    "facebook",
    "instagram",
    "tiktok",
    "twitter",
    "recommendation",
    "other",
  ]).optional(),
  assigned_to: z.coerce.number().nullable().optional(),
  recommended_by: z.coerce.number().nullable().optional(),
});

export type SalesCustomerFormValues = z.infer<
  typeof SalesCustomerFormValuesSchema
>;
