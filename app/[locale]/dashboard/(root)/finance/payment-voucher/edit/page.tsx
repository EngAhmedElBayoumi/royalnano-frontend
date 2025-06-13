import EditPage from '@/components/dashboard/EditPage';
import VoucherForm, { VoucherFormValues } from '@/components/dashboard/forms/finance/VoucherForm';
import { handleApiError } from '@/lib/utils/handleApiError';
import { useGetPaymentVoucherByIdQuery, useUpdatePaymentVoucherMutation } from '@/redux/services/dashboard/finance/paymentVoucherApi';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import React from 'react'

export default function EditPaymentVoucher() {
     const searchParams = useSearchParams();
      const id = searchParams.get("id");
      const t = useTranslations("finance.paymentVoucher");
      const { data, isLoading, error } = useGetPaymentVoucherByIdQuery(id);
      const [upadatePaymentVoucher, { isLoading: submitting }] = useUpdatePaymentVoucherMutation();
    const defaultValues = data && {
    ...data,
    account: Number(data.account),
    supplier: Number(data.supplier),
    purchase_invoice: Number(data.purchase_invoice),
  };
    const handleSubmit = async (data:VoucherFormValues) => {
        const payload = {
        ...data,
        account: Number(data.account),
        supplier: Number(data.supplier),
        purchase_invoice: Number(data.purchase_invoice),
        };
        const response = await upadatePaymentVoucher({ id, data: payload });
        if (response.error) handleApiError(response.error);
    };
  return (
    <EditPage
      title={t("editPaymentVoucher")}
      data={defaultValues}
      isLoading={isLoading}
      error={error}
      submitting={submitting}
      onSubmit={handleSubmit}
      Form={VoucherForm}
      redirectPath="/dashboard/finance?tab=payment-voucher"
    />
  )
}
