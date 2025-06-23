"use client"
import CreatePage from '@/components/dashboard/CreatePage';
import ReceiptForm, { ReceiptFormValues } from '@/components/dashboard/forms/finance/ReceiptForm';
import { handleApiError } from '@/lib/utils/handleApiError';
import { useCreateReceiptVoucherMutation } from '@/redux/services/dashboard/finance/receiptVoucherApi';
import { useTranslations } from 'next-intl';
import React from 'react';

export default function CreateReceiptVoucher() {
  const t = useTranslations("finance.receiptVoucher");
  const [CreateRecipt, { isLoading }] = useCreateReceiptVoucherMutation();
  
  const handleSubmit = async (data: ReceiptFormValues) => {
    console.log("data", data);
    const payload = {
      ...data,
      account: Number(data.account),
      customer: Number(data.customer),
      invoice: Number(data.invoice),
      amount_received: Number(data.amount_received),

    };
    const response = await CreateRecipt(payload);
    if (response.error) handleApiError(response.error);
  };
  
  return (
    <CreatePage
      title={t("addReceiptVoucher")}
      onSubmit={handleSubmit}
      Form={ReceiptForm}
      redirectPath="/dashboard/finance?tab=receipt-voucher"
      isLoading={isLoading}
    />
  );
}