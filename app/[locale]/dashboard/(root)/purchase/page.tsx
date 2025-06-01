"use client";
import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import CustomTabs from "@/components/dashboard/CustomTabs";
import PurchaseExpenseCategory from "@/components/dashboard/purchase/PurchaseExpenseCategory";
import PurchaseInvoice from "@/components/dashboard/purchase/PurchaseInvoice";
import PurchaseOrder from "@/components/dashboard/purchase/PurchaseOrder";
import PurchaseRequest from "@/components/dashboard/purchase/PurchaseRequest";
import PurchaseSupplier from "@/components/dashboard/purchase/PurchaseSupplier";
import PurchaseWarehouse from "@/components/dashboard/purchase/PurchaseWarehouse";

function PurchasePage() {
  const t = useTranslations("Purchase");
  const permissions = useSelector(
    (state: RootState) => state.profile.permissions
  );
  const tabs = [
    {
      id: "expense-category",
      label: t("expenseCategory"),
      permissionKey: "expensecategory",
      icon: (
        <Image
          src="/assets/icons/dashboard/inventory/category.svg"
          alt="icon"
          width="24"
          height="24"
        />
      ),
      content: <PurchaseExpenseCategory />,
    },
    {
      id: "invoice",
      label: t("invoice"),
      permissionKey: "invoicedetail", // To be edited if needed
      icon: (
        <Image
          src="/assets/icons/dashboard/sales/invoice.svg"
          alt="icon"
          width="24"
          height="24"
        />
      ),
      content: <PurchaseInvoice />,
    },
    {
      id: "order",
      label: t("order"),
      permissionKey: "purchaseorder",
      icon: (
        <Image
          src="/assets/icons/dashboard/sales/order.svg"
          alt="icon"
          width="24"
          height="24"
        />
      ),
      content: <PurchaseOrder />,
    },
    {
      id: "request",
      label: t("request"),
      permissionKey: "purchaserequest", // To be edited if needed
      icon: (
        <Image
          src="/assets/icons/dashboard/sales/invoice.svg"
          alt="icon"
          width="24"
          height="24"
        />
      ),
      content: <PurchaseRequest />,
    },
    {
      id: "supplier",
      label: t("supplier"),
      permissionKey: "supplier",
      icon: (
        <Image
          src="/assets/icons/dashboard/purchase/supplier.svg"
          alt="icon"
          width="24"
          height="24"
        />
      ),
      content: <PurchaseSupplier />,
    },
    {
      id: "warehouse",
      label: t("warehouse"),
      permissionKey: "warehouse",
      icon: (
        <Image
          src="/assets/icons/dashboard/purchase/warehouse.svg"
          alt="icon"
          width="24"
          height="24"
        />
      ),
      content: <PurchaseWarehouse />,
    },
  ];

  const filteredTabs = tabs.filter((tab) => {
    return permissions[tab.permissionKey]?.view;
  });
  return <CustomTabs tabs={filteredTabs} defaultTab={filteredTabs[0]?.id} />;
}

export default PurchasePage;
