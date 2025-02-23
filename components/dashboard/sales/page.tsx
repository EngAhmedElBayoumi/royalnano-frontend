import CustomTabs from "@/components/dashboard/CustomTabs";
import Attendance from "@/components/dashboard/hr/attendance";
import Bonuses from "@/components/dashboard/hr/Bonuses";
import Employees from "@/components/dashboard/hr/employees";
import Salaries from "@/components/dashboard/hr/salaries";
import Vacations from "@/components/dashboard/hr/vacations";
import Image from "next/image";
import { useTranslations } from "next-intl";
import React from "react";

function SalesPage() {
  const t = useTranslations("Sales");

  const tabs = [
    {
      label: t("tabs.sales"),
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
      label: t("tabs.customer"),
      icon: (
        <Image
          width="24"
          height="24"
          alt="customer"
          src="/assets/icons/dashboard/sales/customer.svg"
        />
      ),
      content: <Salaries />,
    },
    {
      label: t("tabs.quotation"),
      icon: (
        <Image
          width="24"
          height="24"
          alt="quotation"
          src="/assets/icons/dashboard/sales/quotation.svg"
        />
      ),
      content: <Bonuses />,
    },
    {
      label: t("tabs.order"),
      icon: (
        <Image
          width="24"
          height="24"
          alt="order"
          src="/assets/icons/dashboard/sales/order.svg"
        />
      ),
      content: <Vacations />,
    },
    {
      label: t("tabs.invoice"),
      icon: (
        <Image
          width="24"
          height="24"
          alt="invoice"
          src="/assets/icons/dashboard/sales/invoice.svg"
        />
      ),
      content: <Attendance />,
    },
    {
      label: t("tabs.receipt"),
      icon: (
        <Image
          width="24"
          height="24"
          alt="receipt"
          src="/assets/icons/dashboard/sales/receipt.svg"
        />
      ),
      content: <Attendance />,
    },
  ];

  return <CustomTabs tabs={tabs} defaultTab={t("sales")} />;
}

export default SalesPage;
