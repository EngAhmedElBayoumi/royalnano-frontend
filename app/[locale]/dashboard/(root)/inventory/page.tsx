import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import CustomTabs from "@/components/dashboard/CustomTabs";
import Items from "@/components/dashboard/inventory/items";
import Category from "@/components/dashboard/inventory/category";
import Preorder from "@/components/dashboard/inventory/preorder";
import Movement from "@/components/dashboard/inventory/movement";
import StockAdjustment from "@/components/dashboard/inventory/stockAdjustment";

function InventoryPage() {
  const t = useTranslations("Inventory");

  const tabs = [
    {
      label: t("items"),
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

  return <CustomTabs tabs={tabs} defaultTab={t("items")} />;
}

export default InventoryPage;
