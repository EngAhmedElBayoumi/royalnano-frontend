"use client";
import AddSalesCustomerForm from "@/components/dashboard/forms/sales/AddSalesCustomerForm";
import IconWithTitle from "@/components/dashboard/IconWithTitle";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useGetSalesCustomerByIdQuery, useUpdateSalesCustomerMutation } from "@/redux/services/dashboard/sales/salesCustomerApi";
import { SalesCustomerFormValues } from "@/lib/validations/dashboard/sales/salesCustomerSchema";

export default function EditSalesCustomer() {
  const t = useTranslations("Sales");
  const searchParams = useSearchParams();
  const id = searchParams.get("id"); 

  const [defaultValues, setDefaultValues] = useState<Partial<SalesCustomerFormValues>>({});
  const [updateSalesCustomer] = useUpdateSalesCustomerMutation(); 

  const { data: customerData, isLoading, isError } = useGetSalesCustomerByIdQuery(id || "", {
    skip: !id, 
  });

  useEffect(() => {
    if (customerData) {
      setDefaultValues({
        customer_name: customerData.customer_name,
        contact_person: customerData.contact_person,
        id: customerData.id,
        phone_number: customerData.phone_number,
        email: customerData.email,
        address: customerData.address,
        city: customerData.city,
        country: customerData.country,
        notes: customerData.notes,
        branch: customerData.branch,
        customer_type: customerData.customer_type,
        tax_number: customerData.tax_number,
        national_id: customerData.national_id,
      });
    }
  }, [customerData]);

  const handleFormSubmit = async (data: SalesCustomerFormValues) => {
    try {
      console.log("Form data submitted:", data);
      const response = await updateSalesCustomer(data); 
      if ("error" in response) {
        throw new Error("Update failed");
      }
      console.log("Customer updated successfully");
    } catch (error) {
      console.error("Error in update:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading customer data.</div>;
  }

  return (
    <main className="mx-7 my-5">
      <div className="flex">
        <IconWithTitle
          imageSrc="/assets/icons/edit.svg" 
          title={t("editCustomer")}
          backgroundColor="#F8F7F7"
          textColor="primary"
        />
      </div>

=      <div className="bg-dashboardBg px-6 pt-5 pb-8 ltr:rounded-r-[20px] ltr:rounded-bl-[20px] rtl:rounded-l-[20px] rtl:rounded-br-[20px] ltr:lg:pr-[200px] rtl:lg:pl-[200px]">
        {defaultValues && <AddSalesCustomerForm defaultValues={defaultValues}/>}
      </div>
    </main>
  );
}
