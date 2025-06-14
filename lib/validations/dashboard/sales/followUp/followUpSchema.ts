import { z } from "zod";

export const followUpSchema = z.object({
  follow_up_type: z.coerce.number().positive("Follow up type must be selected"),
  comment: z
    .string()
    .max(100, "Comment must be 100 characters or less")
    .optional(),
  customer: z.coerce.number().positive("Customer must be selected"),
  action_date: z
    .date()
    .optional()
    .refine((date) => !date || date >= new Date(), {
      message: "Action date cannot be in the past",
    }),
});

export type FollowUpFormValues = z.infer<typeof followUpSchema>;
