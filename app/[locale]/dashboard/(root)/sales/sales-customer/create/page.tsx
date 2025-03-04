"use client";
import AddSalesCustomerForm from "@/components/dashboard/forms/sales/AddSalesCustomerForm";
import IconWithTitle from "@/components/dashboard/IconWithTitle";
import { useTranslations } from "next-intl";

export default function CreateSalesCustomer() {
  const t = useTranslations("Sales");

  return (
    <main className="mx-7 my-5">
      <div className="flex">
        {/* Page Title */}
        <IconWithTitle
          imageSrc="/assets/icons/add.svg"
          title={t("addCustomer")}
          backgroundColor="#F8F7F7"
          textColor="primary"
        />
      </div>

      {/* Form Container */}
      <div className="bg-dashboardBg px-6 pt-5 pb-8 ltr:rounded-r-[20px] ltr:rounded-bl-[20px] rtl:rounded-l-[20px] rtl:rounded-br-[20px] ltr:lg:pr-[200px] rtl:lg:pl-[200px]">
        <AddSalesCustomerForm />
      </div>
    </main>
  );
}