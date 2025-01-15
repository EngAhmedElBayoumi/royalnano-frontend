import * as z from "zod";

export const bonusSchema = z
  .object({
    name: z.string().nonempty("Name is required"),
    branch_name: z.string().nonempty("Branch name is required"),
    rewards: z.string().nonempty("Rewards are required"),
    start: z.date({ required_error: "Start date is required" }),
    end: z.date({ required_error: "End date is required" }),
    date: z.date({ required_error: "Date is required" }),
  })
  .refine((data) => data.start < data.end, {
    message: "start date must be before end date",
    path: ["start"],
  });
