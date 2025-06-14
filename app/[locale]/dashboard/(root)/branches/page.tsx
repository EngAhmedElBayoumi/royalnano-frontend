"use client";
import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import CustomTabs from "@/components/dashboard/CustomTabs";
import Branches from "@/components/dashboard/branches/Branches";

function InventoryPage() {
  const t = useTranslations("branches.tabs");

  const permissions = useSelector(
    (state: RootState) => state.profile.permissions
  );

  const tabs = [
    {
      id: "branches",
      label: t("branches"),
      permissionKey: "branch",
      icon: (
        <Image
          src="/assets/icons/branches.svg"
          alt="icon"
          width="24"
          height="24"
        />
      ),
      content: <Branches />,
    },
    {
      id: "branches-transactions",
      label: t("branches_transactions"),
      permissionKey: "branchaccounttransaction",
      icon: (
        <Image
          src="/assets/icons/dashboard/inventory/stock.svg"
          alt="icon"
          width="24"
          height="24"
        />
      ),
      content: "",
    },
  ];

  const filteredTabs = tabs.filter((tab) => {
    return permissions[tab.permissionKey]?.view;
  });

  return <CustomTabs tabs={filteredTabs} defaultTab={filteredTabs[0]?.id} />;
}

export default InventoryPage;
