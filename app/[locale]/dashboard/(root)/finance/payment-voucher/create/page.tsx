"use client"
import CreatePage from '@/components/dashboard/CreatePage';
import VoucherForm, { VoucherFormValues } from '@/components/dashboard/forms/finance/VoucherForm';
import { handleApiError } from '@/lib/utils/handleApiError';
import { useCreatePaymentVoucherMutation } from '@/redux/services/dashboard/finance/paymentVoucherApi';
import { useTranslations } from 'next-intl';
import React from 'react';

export default function CreatePaymentVoucher() {
  const t = useTranslations("finance.paymentVoucher");
  const [CreateVoucher, { isLoading }] = useCreatePaymentVoucherMutation();
  
  const handleSubmit = async (data: VoucherFormValues) => {
    console.log("data", data);
    const payload = {
      ...data,
    };
    const response = await CreateVoucher(payload);
    if (response.error) handleApiError(response.error);
  };
  
  return (
    <CreatePage
      title={t("addPaymentVoucher")}
      onSubmit={handleSubmit}
      Form={VoucherForm}
      redirectPath="/dashboard/finance?tab=payment-voucher"
      isLoading={isLoading}
    />
  );
}