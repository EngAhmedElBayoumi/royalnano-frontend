import { z } from "zod";

export const competitionSchema = z.object({
  department: z.number({
    required_error: "Department is required",
    invalid_type_error: "Department must be a number",
  }),
  winner: z.number().optional(),
  target: z.number({
    required_error: "Target is required",
    invalid_type_error: "Target must be a number",
  }),
  reward: z.string({
    required_error: "Reward is required",
  }),
  start_date: z.string({
    required_error: "Start date is required",
  }),
  end_date: z.string({
    required_error: "End date is required",
  }),
  extra_fields: z.record(z.string()).optional(),
});
