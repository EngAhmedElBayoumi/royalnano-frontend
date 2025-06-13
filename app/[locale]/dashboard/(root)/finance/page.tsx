"use client";
import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import FinancesTab from "@/components/dashboard/finance/finance";
import PaymentVoucherTab from "@/components/dashboard/finance/payment-voucher";
import CustomTabs from "@/components/dashboard/CustomTabs";
import ReceiptVoucherTab from "@/components/dashboard/finance/receipt-voucher";


function FinancePage() {
  const t = useTranslations("finance.tabs");

  const permissions = useSelector(
    (state: RootState) => state.profile.permissions
  );

  const tabs = [
    {
      id: "finance",
      label: t("finance"),
      permissionKey: "customer",
      icon: (
        <Image
          width="24"
          height="24"
          alt={t("finance")}
          src="/assets/icons/dashboard/hr/departments.svg"
        />
      ),
      content: <FinancesTab />,
    },
    {
      id: "payment-voucher",
      label: t("payment-voucher"),
      permissionKey: "customer",
      icon: (
        <Image
          width="24"
          height="24"
          alt={t("payment-voucher")}
          src="/assets/icons/dashboard/hr/employees.svg"
        />
      ),
      content: <PaymentVoucherTab />,
    },
    {
      id: "receipt-voucher",
      label: t("receipt-voucher"),
      permissionKey: "customer",
      icon: (
        <Image
          width="24"
          height="24"
          alt={t("receipt-voucher")}
          src="/assets/icons/dashboard/hr/attendance.svg"
        />
      ),
      content: <ReceiptVoucherTab/>, // Placeholder for Receipt Voucher Tab, implement as needed
    }
    
  ];

  const filteredTabs = tabs.filter((tab) => {
    return permissions[tab.permissionKey]?.view;
  });

  return (
    <>
      <CustomTabs tabs={filteredTabs} defaultTab={filteredTabs[0]?.id} />
    </>
  );
}

export default FinancePage;
