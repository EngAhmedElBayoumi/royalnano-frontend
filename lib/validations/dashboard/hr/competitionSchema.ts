import * as z from "zod";

export const competitionSchema = z.object({
  department: z.coerce.number().min(1, "Department is required"),
  winner: z.coerce.number().optional(),
  target: z.number().min(1, "Target is required"),
  reward: z.string().nonempty("Reward is required"),
  start_date: z.string().nonempty("Start date is required"),
  end_date: z.string().nonempty("End date is required"),
  extra_fields: z.record(z.any()).optional(),
});

export type CompetitionFormData = z.infer<typeof competitionSchema>;
