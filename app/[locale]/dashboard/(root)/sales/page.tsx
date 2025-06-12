import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import CustomTabs from "@/components/dashboard/CustomTabs";
import SalesInvoice from "@/components/dashboard/sales/salesInvoice";
import SalesQuotation from "@/components/dashboard/sales/salesQuotation";
import SalesCustomer from "@/components/dashboard/sales/salesCustomer";
import ClientRequest from "@/components/dashboard/sales/clientRequest";

function SalesPage() {
  const t = useTranslations("Sales");

  const tabs = [
    {
      id: "sales-customer",
      label: t("customer"),
      icon: (
        <Image
          width="24"
          height="24"
          alt="customer"
          src="/assets/icons/dashboard/sales/customer.svg"
        />
      ),
      content: <SalesCustomer />,
    },
    {
      id: "sales-quotation",
      label: t("salesQuotation"),
      icon: (
        <Image
          width="24"
          height="24"
          alt="quotation"
          src="/assets/icons/dashboard/sales/quotation.svg"
        />
      ),
      content: <SalesQuotation />,
    },
    {
      id: "sales-invoice",
      label: t("salesInvoice"),
      icon: (
        <Image
          width="24"
          height="24"
          alt={t("salesInvoice")}
          src="/assets/icons/dashboard/sales/invoice.svg"
        />
      ),
      content: <SalesInvoice />,
    },
    {
      id: "client-request",
      label: t("client"),
      icon: (
        <Image
          width="24"
          height="24"
          alt={t("client")}
          src="/assets/icons/dashboard/sales/invoice.svg"
        />
      ),
      content: <ClientRequest />,
    },
  ];

  return <CustomTabs tabs={tabs} defaultTab={tabs[0].id} />;
}

export default SalesPage;
