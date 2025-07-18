"use client";
import EditPage from '@/components/dashboard/EditPage';
import ReceiptForm, { ReceiptFormValues } from '@/components/dashboard/forms/finance/ReceiptForm';
import { handleApiError } from '@/lib/utils/handleApiError';
import { useGetReceiptVoucherByIdQuery, useUpdateReceiptVoucherMutation } from '@/redux/services/dashboard/finance/receiptVoucherApi';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import React from 'react'

export default function EditReceiptVoucher() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const t = useTranslations("finance.receiptVoucher");
  const { data, isLoading, error } = useGetReceiptVoucherByIdQuery(id);
  const [updateReceiptVoucher, { isLoading: submitting }] = useUpdateReceiptVoucherMutation();
  
  const defaultValues = data && {
    ...data,
    account: Number(data.account),
    customer: Number(data.customer),
    invoice: Number(data.invoice),
    amount_received: Number(data.amount_received),
  };
  
  const handleSubmit = async (data: ReceiptFormValues) => {
    const payload = {
      ...data,
      account: Number(data.account),
      customer: Number(data.customer),
      invoice: Number(data.invoice),
      amount_received: Number(data.amount_received),
    };
    const response = await updateReceiptVoucher({ id, data: payload });
    if (response.error) handleApiError(response.error);
  };
  
  return (
    <EditPage
      title={t("editReceiptVoucher")}
      data={defaultValues}
      isLoading={isLoading}
      error={error}
      submitting={submitting}
      onSubmit={handleSubmit}
      Form={ReceiptForm}
      redirectPath="/dashboard/finance?tab=receipt-voucher"
    />
  )
}

