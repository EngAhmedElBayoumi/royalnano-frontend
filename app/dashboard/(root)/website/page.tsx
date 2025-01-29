import React from "react";
import Image from "next/image";
import CustomTabs from "@/components/dashboard/CustomTabs";
import Services from "@/components/dashboard/website/services";
import Products from "@/components/dashboard/website/products";
import About from "@/components/dashboard/website/about";
import Gallery from "@/components/dashboard/website/gallery";
import ContactUs from "@/components/dashboard/website/contactUs";

function WebsitePage() {
  const tabs = [
    {
      label: "services",
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
    {
      icon: (
        <Image
          src="/assets/icons/dashboard/inventory/category.svg"
          alt="icon"
          width="24"
          height="24"
        />
      ),
      label: "products",
      content: <Products />,
    },
    {
      icon: (
        <Image
          src="/assets/icons/dashboard/website/about.svg"
          alt="icon"
          width="24"
          height="24"
        />
      ),
      label: "about",
      content: <About />,
    },
    {
      icon: (
        <Image
          src="/assets/icons/dashboard/website/gallery.svg"
          alt="icon"
          width="24"
          height="24"
        />
      ),
      label: "gallery",
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
      label: "contact Us",
      content: <ContactUs />,
    },
  ];

  return <CustomTabs tabs={tabs} defaultTab="services" />;
}

export default WebsitePage;
