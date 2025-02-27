"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";
import IconWithTitle from "@/components/dashboard/IconWithTitle";
import CustomModal from "@/components/modals/CustomModal";
import FormSkelton from "@/components/dashboard/skelton/FormSkelton";
import LoadingError from "@/components/dashboard/LoadingError";
import SalesOrderForm, { SalesOrderFormValues } from "@/components/dashboard/forms/sales/SalesOrderForm";
import { useGetSalesOrderByIdQuery, useUpdateSalesOrderMutation } from "@/redux/services/dashboard/sales/salesOrderApi";

export default function EditSalesOrder() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const t = useTranslations("Sales.SalesOrder");
  const tabTranslate = useTranslations("Sales");

  const [updateSalesOrder] = useUpdateSalesOrderMutation();
  const { data, isLoading, error } = useGetSalesOrderByIdQuery(id);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Log fetched data
  // console.log("Fetched Data:", data);

  const defaultValues: SalesOrderFormValues = data && {
    order_date: data.order_date,
    customer: data.customer.id, // Ensure this is a number
    branch: data.branch, // Ensure this is a number
    sales_representative: data.sales_representative,
    description: data.description,
    items: data.items.map((item) => ({
      quantity: item.quantity,
      item: item.item?.id || null, // Ensure this is a number or null
      custom_item_name: item.custom_item_name || "",
      custom_price: item.custom_price || "",
      discount: item.discount,
      discount_percent: item.discount_percent,
    })),
    status: data.status,
  };

  // Log default values
  // console.log("Default Values:", defaultValues);

  const handleModalChange = (isOpen: boolean) => {
    setIsModalOpen(isOpen);
  };

  const handleSubmit = async (formData: SalesOrderFormValues) => {
    console.log("Form submitted with data:", formData); 

    try {
      // Prepare the payload for the API
      const payload = {
        ...formData,
        items: formData.items.map((item) => ({
          quantity: item.quantity,
          item: item.item || null,
          custom_item_name: item.custom_item_name || "",
          custom_price: item.custom_price || "",
          discount: item.discount,
          discount_percent: item.discount_percent,
        })),
        total_amount: formData.items.reduce((total, item) => {
          const itemTotal = parseFloat(item.custom_price) * item.quantity;
          return total + itemTotal;
        }, 0).toFixed(2), // Calculate total amount based on items
      };

      // Log payload
      console.log("Payload:", payload);

      // Call the update mutation
      const response = await updateSalesOrder({ id, data: payload });

      // Log API response
      console.log("Mutation response:", response);

      // Handle the response
      if (response.error) {
        console.error("API Error Details:", response.error); // Log full error details
        setIsModalOpen(true);
        throw new Error(response.error.data?.message || "Update failed");
      } else {
        // Redirect to the sales orders list on success
        router.push(`/dashboard/sales?tab=${tabTranslate("order")}`);
      }
    } catch (error) {
      setIsModalOpen(true);
      console.error("Submission Error:", error);
    }
  };

  return (
    <main className="mx-7 my-5">
      <CustomModal
        isOpen={isModalOpen}
        onChange={handleModalChange}
        title="Error!"
        description="Your request wasn't processed successfully."
      />
      <div className="flex">
        <IconWithTitle
          imageSrc="/assets/icons/edit.svg"
          title={t("editSalesOrder")}
          backgroundColor="#F8F7F7"
          textColor="primary"
        />
      </div>
      <div className="bg-dashboardBg px-6 pt-5 pb-8 ltr:rounded-r-[20px] ltr:rounded-bl-[20px] rtl:rounded-l-[20px] rtl:rounded-br-[20px]">
        {isLoading ? (
          <div className="ltr:lg:pr-[200px] rtl:lg:pl-[200px]">
            <FormSkelton />
          </div>
        ) : error ? (
          <LoadingError />
        ) : (
          <div className="ltr:lg:pr-[200px] rtl:lg:pl-[200px]">
            <SalesOrderForm
              onSubmit={handleSubmit}
              defaultValues={defaultValues}
            />
          </div>
        )}
      </div>
    </main>
  );
}