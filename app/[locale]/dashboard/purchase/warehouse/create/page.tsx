'use client';

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import EditPage from '@/components/dashboard/EditPage';
import WarehouseForm, { WarehouseFormValues } from '@/components/dashboard/purchase/WarehouseForm';
import { useCreateWarehouseMutation } from '@/redux/services/dashboard/purchase/warehouseApi';

const CreateWarehousePage = () => {
  const router = useRouter();
  const params = useParams();
  const { locale } = params;

  const [createWarehouse, { isLoading, error }] = useCreateWarehouseMutation();

  const handleSubmit = async (values: WarehouseFormValues) => {
    try {
      await createWarehouse(values).unwrap();
      router.push(`/${locale}/dashboard/purchase?tab=warehouse`);
    } catch (err: any) {
      throw new Error(err.data?.detail || err.message);
    }
  };

  return (
    <EditPage
      title="Create New Warehouse"
      Form={WarehouseForm}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      error={error}
      redirectPath={`/${locale}/dashboard/purchase?tab=warehouse`}
    />
  );
};

export default CreateWarehousePage;