import * as z from "zod";
export const voucherSchema = z.object({
    account: z.coerce.number().optional(),
    supplier: z.coerce.number().optional(),
    payment_date: z.string().min(1, "Payment date is required"),
    payment_method: z.string().min(1, "Payment method is required"),
    amount_paid: z.string().min(1, "Amount paid is required").or(
        z.number().min(1, "Amount paid is required")
    ),
    purchase_invoice: z.coerce.number().optional(),
    description: z.string().optional(),
})