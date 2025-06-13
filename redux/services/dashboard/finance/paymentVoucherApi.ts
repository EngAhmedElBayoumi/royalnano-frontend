import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/redux/services/common";
export const paymentVoucherApi = createApi({
  reducerPath: "paymentVoucherApi",
  baseQuery,
  tagTypes: ["paymentVoucher"],
  endpoints: (builder) => ({
    getPaymentVoucher: builder.query({
      query: () => ({
        url: "finance/payment-voucher/",
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [{ type: "paymentVoucher", id: "LIST" }]
          : [], // Enables re-fetching when invalidated
    }),
    createPaymentVoucher: builder.mutation({
      query: (data) => ({
        url: "finance/payment-voucher/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "paymentVoucher", id: "LIST" }],
    }),
    getPaymentVoucherById: builder.query({
      query: (id) => `finance/payment-voucher/${id}/`,
    }),
    updatePaymentVoucher: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `finance/payment-voucher/${id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [{ type: "paymentVoucher", id: "LIST" }],
    }),
  }),
});
export const {
    useGetPaymentVoucherQuery,
    useCreatePaymentVoucherMutation,
    useGetPaymentVoucherByIdQuery,
    useUpdatePaymentVoucherMutation,
    } = paymentVoucherApi;