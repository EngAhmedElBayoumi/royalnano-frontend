"use client";
import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import CustomTabs from "@/components/dashboard/CustomTabs";
import Services from "@/components/dashboard/website/services";
// import Products from "@/components/dashboard/website/products";
// import About from "@/components/dashboard/website/about";
import Gallery from "@/components/dashboard/website/gallery";
import ContactUs from "@/components/dashboard/website/contactUs";
import CustomerReviews from "@/components/dashboard/website/customerReviews";

function WebsitePage() {
  const t = useTranslations("dashboardWebsite.tabs");

  const permissions = useSelector(
    (state: RootState) => state.profile.permissions
  );

  const tabs = [
    {
      label: t("services"),
      permissionKey: "service",
      icon: (
        <Image
          src="/assets/icons/dashboard/website/services.svg"
          alt="icon"
          width="24"
          height="24"
        />
      ),
      content: <Services />,
    },
    // {
    //   icon: (
    //     <Image
    //       src="/assets/icons/dashboard/inventory/category.svg"
    //       alt="icon"
    //       width="24"
    //       height="24"
    //     />
    //   ),
    //   label: "products",
    //   content: <Products />,
    // },
    // {
    //   icon: (
    //     <Image
    //       src="/assets/icons/dashboard/website/about.svg"
    //       alt="icon"
    //       width="24"
    //       height="24"
    //     />
    //   ),
    //   label: "about",
    //   content: <About />,
    // },
    {
      icon: (
        <Image
          src="/assets/icons/dashboard/website/gallery.svg"
          alt="icon"
          width="24"
          height="24"
        />
      ),
      label: t("gallery"),
      permissionKey: "gallery",
      content: <Gallery />,
    },
    {
      icon: (
        <Image
          src="/assets/icons/dashboard/website/contact.svg"
          alt="icon"
          width="24"
          height="24"
        />
      ),
      label: t("contact"),
      permissionKey: "contact",
      content: <ContactUs />,
    },
    {
      icon: (
        <Image
          src="/assets/icons/dashboard/website/reviews.svg"
          alt="icon"
          width="24"
          height="24"
        />
      ),
      label: t("customerReviews"),
      permissionKey: "customerreview",
      content: <CustomerReviews />,
    },
  ];

  const filteredTabs = tabs.filter((tab) => {
    return permissions[tab.permissionKey]?.view;
  });

  return <CustomTabs tabs={filteredTabs} defaultTab={filteredTabs[0]?.label} />;
}

export default WebsitePage;
