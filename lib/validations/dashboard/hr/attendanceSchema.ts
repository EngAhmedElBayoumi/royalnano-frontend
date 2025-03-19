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
    attendance: z.date({ required_error: "Attendance time is required" }),
    departure: z.date({ required_error: "Departure time is required" }),
    working_hours: z.number().min(0, "Working hours must be a positive number"),
    location: z.string().max(100).optional(),
    longitude: z.number().optional(),
    latitude: z.number().optional(),
  })
  .refine((data) => data.attendance < data.departure, {
    message: "Attendance time must be before departure time",
    path: ["attendance"],
  })
  .refine((data) => data.attendance <= new Date(), {
    message: "Attendance time must be before or equal to the current time",
    path: ["attendance"],
  })
  .refine((data) => data.departure <= new Date(), {
    message: "Departure time must be before or equal to the current time",
    path: ["departure"],
  })
  .refine((data) => isSameDay(data.attendance, data.departure), {
    message: "Attendance and departure must be on the same day",
    path: ["departure"], // You can associate this error with either field
  });
