import * as z from "zod";

export const interviewSchema = z.object({
  interviewers: z
    .array(z.coerce.number().min(1, "At least one interviewer is required"))
    .min(1, "At least one interviewer is required"),
  interview_date: z.date({ required_error: "Interview date is required" }),
  status: z.enum(["scheduled", "completed", "rejected"]),
  applicant: z.number().min(1, "Applicant is required"),
  extra_fields: z.record(z.any()).optional(),
});

export type InterviewFormData = z.infer<typeof interviewSchema>;
