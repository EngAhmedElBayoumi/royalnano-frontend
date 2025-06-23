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
import Blogs from "@/components/dashboard/website/Blogs";
import Social from "@/components/dashboard/website/social";

function WebsitePage() {
  const t = useTranslations("dashboard_website.tabs");

  const permissions = useSelector(
    (state: RootState) => state.profile.permissions
  );

  const tabs = [
    {
      id: "services",
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
      id: "gallery",
      label: t("gallery"),
      permissionKey: "gallery",
      icon: (
        <Image
          src="/assets/icons/dashboard/website/gallery.svg"
          alt="icon"
          width="24"
          height="24"
        />
      ),
      content: <Gallery />,
    },
    {
      id: "contact",
      label: t("contact"),
      permissionKey: "contact",
      icon: (
        <Image
          src="/assets/icons/dashboard/website/contact.svg"
          alt="icon"
          width="24"
          height="24"
        />
      ),
      content: <ContactUs />,
    },
    {
      id: "customer-reviews",
      label: t("customerReviews"),
      permissionKey: "customerreview",
      icon: (
        <Image
          src="/assets/icons/dashboard/website/reviews.svg"
          alt="icon"
          width="24"
          height="24"
        />
      ),
      content: <CustomerReviews />,
    },
    {
      id: "blogs",
      label: t("blogs"),
      permissionKey: "blog",
      icon: (
        <Image
          src="/assets/icons/dashboard/website/blogs.svg"
          alt="icon"
          width="24"
          height="24"
        />
      ),
      content: <Blogs />,
    },
    {
      id: "social",
      label: t("social"),
      permissionKey: "socialcode",
      icon: (
        <Image
          src="/assets/icons/dashboard/website/social.svg"
          alt="icon"
          width="24"
          height="24"
        />
      ),
      content: <Social />,
    },
  ];

  const filteredTabs = tabs.filter((tab) => {
    return permissions[tab.permissionKey]?.view;
  });

  return <CustomTabs tabs={filteredTabs} defaultTab={filteredTabs[0]?.id} />;
}

export default WebsitePage;
