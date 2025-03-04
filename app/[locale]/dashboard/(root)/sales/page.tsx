import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import CustomTabs from "@/components/dashboard/CustomTabs";
// import Employees from "@/components/dashboard/hr/employees";
import Salaries from "@/components/dashboard/hr/salaries";
import SalesInvoice from "@/components/dashboard/sales/salesInvoice";
import SalesOrder from "@/components/dashboard/sales/salesOrder";
import SalesQuotation from "@/components/dashboard/sales/salesQuotation";
import SalesReturn from "@/components/dashboard/sales/salesReturn";
import SalesCustomer from "@/components/dashboard/sales/salesCustomer";

function SalesPage() {
  const t = useTranslations("Sales");
  console.log("here is saless")
  console.log(t("sales"));

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
      content: <SalesReturn/>,
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
      label: t("customer"),
      content: <SalesCustomer />,
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
      content: <SalesOrder />,
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
      content: <SalesInvoice />,
    },
    // {
    //   icon: (
    //     <Image
    //       width="24"
    //       height="24"
    //       alt="receipt"
    //       src="/assets/icons/dashboard/sales/receipt.svg"
    //     />
    //   ),
    //   label: t("receipt"),
    //   content: <Attendance />,
    // },
  ];

  return (
    <>
      <CustomTabs tabs={tabs} defaultTab={t("sales")} />
    </>
  );
}

export default SalesPage;
