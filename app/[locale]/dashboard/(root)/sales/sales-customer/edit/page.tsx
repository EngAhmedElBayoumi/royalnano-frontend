"use client";
// import EditSalesCustomerForm from "@/components/dashboard/forms/sales/EditSalesCustomerForm";
import IconWithTitle from "@/components/dashboard/IconWithTitle";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useGetSalesCustomerByIdQuery } from "@/redux/services/dashboard/sales/salesCustomerApi";
import { SalesCustomerFormValues } from "@/lib/validations/dashboard/sales/salesCustomerSchema";
import EditSalesCustomerForm from "@/components/dashboard/forms/sales/editSalesCustomerForm";
import FormSkelton from "@/components/dashboard/skelton/FormSkelton";
import LoadingError from "@/components/dashboard/LoadingError";

export default function EditSalesCustomer() {
  const t = useTranslations("Sales");
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [defaultValues, setDefaultValues] = useState<
    Partial<SalesCustomerFormValues>
  >({});

  const {
    data: customerData,
    isLoading,
    error,
  } = useGetSalesCustomerByIdQuery(id);

  useEffect(() => {
    if (customerData) {
      setDefaultValues({
        customer_name: customerData.customer_name,
        contact_person: customerData.contact_person,
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

  return (
    <main className="mx-4 sm:mx-7 my-5">
      <div className="flex">
        <IconWithTitle
          imageSrc="/assets/icons/edit.svg"
          title={t("editCustomer")}
          backgroundColor="#F8F7F7"
          textColor="primary"
        />
      </div>

      <div className="bg-dashboardBg px-4 sm:px-6 pt-5 pb-8 ltr:rounded-r-[20px] ltr:rounded-bl-[20px] rtl:rounded-l-[20px] rtl:rounded-br-[20px] ltr:lg:pr-[200px] rtl:lg:pl-[200px]">
        {isLoading ? (
          <FormSkelton />
        ) : error ? (
          <LoadingError />
        ) : (
          defaultValues &&
          !isLoading &&
          !error && <EditSalesCustomerForm defaultValues={defaultValues} />
        )}
      </div>
    </main>
  );
}
