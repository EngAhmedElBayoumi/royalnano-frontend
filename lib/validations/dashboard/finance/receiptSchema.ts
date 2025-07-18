import * as z from "zod";
export const receiptSchema = z.object({
    account: z.coerce.number().optional(),
    customer: z.coerce.number().optional(),
    invoice: z.coerce.number().optional(),
    // amount_received: z.string().min(1, "Amount received is required").or(
    //     z.number().min(1, "Amount received is required")
    // ),
    // received_date: z.string().min(1, "Received date is required"),
    // reference_number: z.string().min(1, "Reference number is required"),
    notes: z.string().optional(),
});