import CustomTabs from "@/components/dashboard/CustomTabs";
import Attendance from "@/components/dashboard/hr/attendance";
import Bonuses from "@/components/dashboard/hr/Bonuses";
import Employees from "@/components/dashboard/hr/employees";
import Salaries from "@/components/dashboard/hr/salaries";
import Vacations from "@/components/dashboard/hr/vacations";
import Image from "next/image";
import React from "react";
function HrPage() {
  const tabs = [
    {
      label: "Sales",
      icon: (
        <Image
          width="24"
          height="24"
          alt="employees"
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
          alt="salaries"
          src="/assets/icons/dashboard/sales/customer.svg"
        />
      ),
      label: "Customer",
      content: <Salaries />,
    },
    {
      icon: (
        <Image
          width="24"
          height="24"
          alt="bonuses"
          src="/assets/icons/dashboard/sales/quotation.svg"
        />
      ),
      label: "Sales Quotation",
      content: <Bonuses />,
    },
    {
      icon: (
        <Image
          width="24"
          height="24"
          alt="vacations"
          src="/assets/icons/dashboard/sales/order.svg"
        />
      ),
      label: "Sales Order",
      content: <Vacations />,
    },
    {
      icon: (
        <Image
          width="24"
          height="24"
          alt="vacations"
          src="/assets/icons/dashboard/sales/invoice.svg"
        />
      ),
      label: "Sales Invoice",
      content: <Attendance />,
    },
    {
      icon: (
        <Image
          width="24"
          height="24"
          alt="vacations"
          src="/assets/icons/dashboard/sales/receipt.svg"
        />
      ),
      label: "Sales Receipt",
      content: <Attendance />,
    },
    
  ];

  return (
    <>
      <CustomTabs tabs={tabs} defaultTab="Employees" />
    </>
  );
}

export default HrPage;
