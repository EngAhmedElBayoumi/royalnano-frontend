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
      label: t("invoice"),
       //to be edited 
      permissionKey: "invoicedetail",
      icon: (
        <Image
          src="/assets/icons/dashboard/inventory/invoice.svg"
          alt="icon"
          width="24"
          height="24"
        />
      ),
      content: <PurchaseInvoice />,
    },
    {

      label: t("order"),
      permissionKey: "purchaseorder",
      icon: (
        <Image
          src="/assets/icons/dashboard/inventory/order.svg"
          alt="icon"
          width="24"
          height="24"
        />
      ),
      content: <PurchaseOrder />,
    },
    {
      label: t("request"),
      permissionKey: "purchaserequest",
      icon: (
        <Image
          src="/assets/icons/dashboard/inventory/request.svg"
          alt="icon"
          width="24"
          height="24"
        />
      ),
      content: <PurchaseRequest />,
    },
    {
      label: t("supplier"),
      permissionKey: "supplier",
      icon: (
        <Image
          src="/assets/icons/dashboard/inventory/supplier.svg"
          alt="icon"
          width="24"
          height="24"
        />
      ),
      content: <PurchaseSupplier />,
    },
    {
      label: t("warehouse"),
      permissionKey: "warehouse",
      icon: (
        <Image
          src="/assets/icons/dashboard/inventory/warehouse.svg"
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
  return <CustomTabs tabs={filteredTabs} defaultTab={filteredTabs[0]?.label} />;
}

export default PurchasePage;