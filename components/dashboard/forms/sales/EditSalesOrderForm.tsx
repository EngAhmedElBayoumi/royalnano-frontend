"use client";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUpdateSalesOrderMutation } from "@/redux/services/dashboard/sales/salesOrderApi";
import SalesOrderForm, { SalesOrderFormValues } from "@/components/dashboard/forms/sales/SalesOrderForm";
import CustomModal from "@/components/modals/CustomModal";

interface EditSalesOrderFormProps {
  defaultValues: SalesOrderFormValues;
  onSuccess: () => void;
}

const EditSalesOrderForm = ({ defaultValues, onSuccess }: EditSalesOrderFormProps) => {
  const t = useTranslations("Sales");
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateSalesOrder, { isLoading }] = useUpdateSalesOrderMutation();

  const handleSubmit = async (data: SalesOrderFormValues) => {
    console.log("Form data submitted:", data); // Debugging line
    try {
      await updateSalesOrder({ id: defaultValues.id, ...data }).unwrap();
      onSuccess();
    } catch (error) {
      console.error("Error updating sales order:", error); // Debugging line
      setIsModalOpen(true);
    }
  };
  const handleModalChange = (isOpen: boolean) => {
    setIsModalOpen(isOpen);
  };

  return (
    <>
      <CustomModal
        isOpen={isModalOpen}
        onChange={handleModalChange}
        title="Error!"
        description="Your request wasn't processed successfully."
      />
      <SalesOrderForm
        onSubmit={handleSubmit}
        defaultValues={defaultValues}
      />
    </>
  );
};

export default EditSalesOrderForm;