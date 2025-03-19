import * as z from "zod";

// Helper function to check if two dates are on the same day
const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};
export const attendanceSchema = z
  .object({
    employee: z.coerce.number().min(1, "Employee must be selected"),
    branch: z.coerce.number().min(1, "Branch must be selected"),
    check_in: z.date({ required_error: "Attendance time is required" }),
    check_out: z.date({ required_error: "Departure time is required" }),
    working_hours: z.number().min(0, "Working hours must be a positive number"),
    location: z.string().max(100).optional(),
    longitude: z.number().optional(),
    latitude: z.number().optional(),
  })
  .refine((data) => data.check_in < data.check_out, {
    message: "Attendance time must be before departure time",
    path: ["check_in"],
  })
  .refine((data) => data.check_in <= new Date(), {
    message: "Attendance time must be before or equal to the current time",
    path: ["check_in"],
  })
  .refine((data) => data.check_out <= new Date(), {
    message: "Departure time must be before or equal to the current time",
    path: ["check_out"],
  })
  .refine((data) => isSameDay(data.check_in, data.check_out), {
    message: "Attendance and departure must be on the same day",
    path: ["check_out"], // You can associate this error with either field
  });
