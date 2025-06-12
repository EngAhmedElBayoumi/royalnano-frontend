"use client";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import CustomerInfoTab from "@/components/dashboard/sales/customerInfoTab";
import FollowupsTab from "@/components/dashboard/sales/followupTab";
import QuotationsTab from "@/components/dashboard/sales/QuotationsTab";
import CustomTabs from "@/components/dashboard/CustomTabs";
import InvoicesTab from "@/components/dashboard/sales/invoicesTab";
import AttachmentsTab from "@/components/dashboard/sales/AttachmentsTab";

export default function SalesCustomerViewPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  if (!id || isNaN(Number(id))) {
    router.push("/dashboard/sales");
    return null;
  }

  const tabs = [
    {
      id: "info",
      label: "info",
      icon: (
        <Image
          src="/assets/icons/dashboard/sales/customerTabs/info.svg"
          alt="icon"
          width="24"
          height="24"
        />
      ),
      content: <CustomerInfoTab customerId={Number(id)} />,
    },
    {
      id: "followups",
      label: "followups",
      icon: (
        <Image
          src="/assets/icons/dashboard/sales/customerTabs/followup.svg"
          alt="icon"
          width="24"
          height="24"
        />
      ),
      content: <FollowupsTab customerId={Number(id)} />,
    },
    {
      id: "quotations",
      label: "quotations",
      icon: (
        <Image
          src="/assets/icons/dashboard/sales/quotation.svg"
          alt="icon"
          width="24"
          height="24"
        />
      ),
      content: <QuotationsTab customerId={Number(id)} />,
    },
    {
      id: "invoices",
      label: "invoices",
      icon: (
        <Image
          src="/assets/icons/dashboard/sales/invoice.svg"
          alt="icon"
          width="24"
          height="24"
        />
      ),
      content: <InvoicesTab customerId={Number(id)} />,
    },
    {
      id: "attachments",
      label: "attachments",
      icon: (
        <Image
          src="/assets/icons/dashboard/sales/invoice.svg"
          alt="icon"
          width="24"
          height="24"
        />
      ),
      content: <AttachmentsTab customerId={Number(id)} />,
    },
  ];

  return (
    <>
      <div className="flex items-center gap-4 mx-4 sm:mx-7">
        <ChevronLeft
          className="h-4 w-4 cursor-pointer rtl:rotate-180"
          onClick={() => router.back()}
        />
        <h1 className="text-2xl font-bold">Sales customer details</h1>
      </div>

      <CustomTabs tabs={tabs} defaultTab="info" />
    </>
  );
}
