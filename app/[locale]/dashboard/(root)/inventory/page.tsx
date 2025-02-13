import React from "react";
import Image from "next/image";
import CustomTabs from "@/components/dashboard/CustomTabs";
import Items from "@/components/dashboard/inventory/items";
import Category from "@/components/dashboard/inventory/category";
import Preorder from "@/components/dashboard/inventory/preorder";
import Movement from "@/components/dashboard/inventory/movement";
import StockAdjustment from "@/components/dashboard/inventory/stockAdjustment";

function InventoryPage() {
  const tabs = [
    {
      label: "Items",
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
      icon: (
        <Image
          src="/assets/icons/dashboard/inventory/category.svg"
          alt="icon"
          width="24"
          height="24"
        />
      ),
      label: "category model",
      content: <Category />,
    },
    {
      icon: (
        <Image
          src="/assets/icons/dashboard/inventory/preorder.svg"
          alt="icon"
          width="24"
          height="24"
        />
      ),
      label: "preorder",
      content: <Preorder />,
    },
    {
      icon: (
        <Image
          src="/assets/icons/dashboard/inventory/movement.svg"
          alt="icon"
          width="24"
          height="24"
        />
      ),
      label: "movement",
      content: <Movement />,
    },
    {
      icon: (
        <Image
          src="/assets/icons/dashboard/inventory/stock.svg"
          alt="icon"
          width="24"
          height="24"
        />
      ),
      label: "stock adjustment",
      content: <StockAdjustment />,
    },
  ];

  return <CustomTabs tabs={tabs} defaultTab="Items" />;
}

export default InventoryPage;
