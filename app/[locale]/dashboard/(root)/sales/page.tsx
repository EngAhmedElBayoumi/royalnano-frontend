import CustomTabs from "@/components/dashboard/CustomTabs";
import Attendance from "@/components/dashboard/hr/attendance";
import Employees from "@/components/dashboard/hr/employees";
import Salaries from "@/components/dashboard/hr/salaries";
import Vacations from "@/components/dashboard/hr/vacations";
import SalesQuotation from "@/components/dashboard/sales/salesQuotation";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
function SalesPage() {
  const t = useTranslations("Sales");
  const tabs = [
    {
      label: t("sales"),
      icon: (
        <Image
          width="24"
          height="24"
          alt="sales"
          src="/assets/icons/dashboard/sales/sales.svg"
        />
      ),
      content: <Employees />,
    },
    {
      icon: (
        <Image
          width="24"
          height="24"
          alt="customer"
          src="/assets/icons/dashboard/sales/customer.svg"
        />
      ),
      label:  t("customer"),
      content: <Salaries />,
    },
    {
      icon: (
        <Image
          width="24"
          height="24"
          alt="quotation"
          src="/assets/icons/dashboard/sales/quotation.svg"
        />
      ),
      label: t("salesQuotation"),
      content: <SalesQuotation />,
    },
    {
      icon: (
        <Image
          width="24"
          height="24"
          alt="order"
          src="/assets/icons/dashboard/sales/order.svg"
        />
      ),
      label: t("order"),
      content: <Vacations />,
    },
    {
      icon: (
        <Image
          width="24"
          height="24"
          alt="invoice"
          src="/assets/icons/dashboard/sales/invoice.svg"
        />
      ),
      label: t("invoice"),
      content: <Attendance />,
    },
    {
      icon: (
        <Image
          width="24"
          height="24"
          alt="receipt"
          src="/assets/icons/dashboard/sales/receipt.svg"
        />
      ),
      label: t("receipt"),
      content: <Attendance />,
    },
    
  ];

  return (
    <>
      <CustomTabs tabs={tabs} defaultTab="Employees" />
    </>
  );
}

export default SalesPage;
