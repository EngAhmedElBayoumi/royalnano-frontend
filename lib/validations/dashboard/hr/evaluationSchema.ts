import * as z from "zod";

export const evaluationSchema = z.object({
  score: z.number().min(1, "Score is required"),
  comments: z.string().optional(),
  extra_fields: z.record(z.any()).optional(),
  interview: z.coerce.number().min(1, "Interview is required"),
  interviewer: z.coerce.number().min(1, "Interviewer is required"),
});

export type EvaluationFormData = z.infer<typeof evaluationSchema>;
