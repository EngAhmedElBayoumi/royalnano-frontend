import { z } from "zod";

export const followUpTypeSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export type FollowUpTypeFormValues = z.infer<typeof followUpTypeSchema>;
