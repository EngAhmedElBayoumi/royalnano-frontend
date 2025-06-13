import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/redux/services/common";

export const receiptVoucherApi = createApi({
    reducerPath: "receiptVoucherApi",
    baseQuery,
    tagTypes: ["receiptVoucher"],
    endpoints: (builder) => ({
        getReceiptVouchers: builder.query({
        query: ({ search, ordering, page, page_size }) => ({
            url: "finance/receipt-voucher/",
            method: "GET",
            params: { search, ordering, page, page_size },
        }),
        providesTags: (result) =>
            result
            ? [{ type: "receiptVoucher", id: "LIST" }]
            : [], // Enables re-fetching when invalidated
        }),
    
        createReceiptVoucher: builder.mutation({
        query: (data) => ({
            url: "finance/receipt-voucher/",
            method: "POST",
            body: data,
        }),
        invalidatesTags: [{ type: "receiptVoucher", id: "LIST" }],
        }),
    
        getReceiptVoucherById: builder.query({
        query: (id) => `finance/receipt-voucher/${id}/`,
        }),
    
        updateReceiptVoucher: builder.mutation({
        query: ({ id, ...data }) => ({
            url: `finance/receipt-voucher/${id}/`,
            method: "PATCH",
            body: data,
        }),
        invalidatesTags: [{ type: "receiptVoucher", id: "LIST" }],
        }),
    }),
})
export const {
    useGetReceiptVouchersQuery,
    useCreateReceiptVoucherMutation,
    useGetReceiptVoucherByIdQuery,
    useUpdateReceiptVoucherMutation,
} = receiptVoucherApi;