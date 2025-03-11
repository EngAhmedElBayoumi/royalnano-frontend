"use client";
import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import CustomTabs from "@/components/dashboard/CustomTabs";
import Items from "@/components/dashboard/inventory/items";
import Category from "@/components/dashboard/inventory/category";
import Preorder from "@/components/dashboard/inventory/preorder";
import Movement from "@/components/dashboard/inventory/movement";
import StockAdjustment from "@/components/dashboard/inventory/stockAdjustment";

function InventoryPage() {
  const t = useTranslations("Inventory");

  const permissions = useSelector(
    (state: RootState) => state.profile.permissions
  );

  const tabs = [
    {
      label: t("items"),
      permissionKey: "inventoryitem",
      icon: (
        <Image
          src="/assets/icons/dashboard/inventory/items.svg"
          alt="icon"
          width="24"
          height="24"
        />
      ),
      content: <Items />,
    },
    {
      label: t("categoryModel"),
      permissionKey: "expensecategory",
      icon: (
        <Image
          src="/assets/icons/dashboard/inventory/category.svg"
          alt="icon"
          width="24"
          height="24"
        />
      ),
      content: <Category />,
    },
    {
      label: t("preorder"),
      permissionKey: "preorder",
      icon: (
        <Image
          src="/assets/icons/dashboard/inventory/preorder.svg"
          alt="icon"
          width="24"
          height="24"
        />
      ),
      content: <Preorder />,
    },
    {
      label: t("movement"),
      permissionKey: "movement",
      icon: (
        <Image
          src="/assets/icons/dashboard/inventory/movement.svg"
          alt="icon"
          width="24"
          height="24"
        />
      ),
      content: <Movement />,
    },
    {
      label: t("stockAdjustment"),
      permissionKey: "stockadjustment",
      icon: (
        <Image
          src="/assets/icons/dashboard/inventory/stock.svg"
          alt="icon"
          width="24"
          height="24"
        />
      ),
      content: <StockAdjustment />,
    },
  ];

  const filteredTabs = tabs.filter((tab) => {
    return permissions[tab.permissionKey]?.view;
  });

  return <CustomTabs tabs={filteredTabs} defaultTab={filteredTabs[0]?.label} />;
}

export default InventoryPage;
