'use client';

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import EditPage from '@/components/dashboard/EditPage';
import WarehouseForm, { WarehouseFormValues } from '@/components/dashboard/purchase/WarehouseForm';
import { useGetWarehouseByIdQuery, useUpdateWarehouseMutation } from '@/redux/services/dashboard/purchase/warehouseApi';

const EditWarehousePage = () => {
  const router = useRouter();
  const params = useParams();
  const { id, locale } = params;

  const { data, isLoading: isFetching, error: fetchError } = useGetWarehouseByIdQuery(id as string, { skip: !id });
  const [updateWarehouse, { isLoading: isUpdating, error: updateError }] = useUpdateWarehouseMutation();

  const handleSubmit = async (values: WarehouseFormValues) => {
    try {
      await updateWarehouse({ id: id as string, data: values }).unwrap();
      router.push(`/${locale}/dashboard/purchase?tab=warehouse`);
    } catch (err: any) {
      throw new Error(err.data?.detail || err.message);
    }
  };

  return (
    <EditPage
      title="Edit Warehouse"
      Form={WarehouseForm}
      onSubmit={handleSubmit}
      data={data}
      isLoading={isFetching}
      submitting={isUpdating}
      error={fetchError || updateError}
      redirectPath={`/${locale}/dashboard/purchase?tab=warehouse`}
    />
  );
};

export default EditWarehousePage;
