"use client";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import { useGetSalesCustomerByIdQuery } from "@/redux/services/dashboard/sales/salesCustomerApi";
import { Spinner } from "@/components/ui/spinner";
import CustomerInfoTab from "@/components/dashboard/sales/customerInfoTab";
import FollowupsTab from "@/components/dashboard/sales/followupTab";
import QuotationsTab from "@/components/dashboard/sales/QuotationsTab";
import CustomTabs from "@/components/dashboard/CustomTabs";
import LoadingError from "@/components/dashboard/LoadingError";

export default function SalesCustomerViewPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const {
    data: customerData,
    isLoading: isCustomerLoading,
    error: customerError,
  } = useGetSalesCustomerByIdQuery(id);

  if (!id || isNaN(Number(id))) {
    router.push("/dashboard/sales");
    return null;
  }

  const tabs = [
    {
      label: "info",
      icon: (
        <Image
          src="/assets/icons/dashboard/sales/customerTabs/info.svg"
          alt="icon"
          width="24"
          height="24"
        />
      ),
      content: <CustomerInfoTab customerData={customerData} />,
    },
    {
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
      {customerError ? (
        <LoadingError />
      ) : isCustomerLoading ? (
        <div className="flex justify-center mt-4">
          <Spinner size="xl" className="bg-black dark:bg-white" />
        </div>
      ) : (
        <CustomTabs tabs={tabs} defaultTab="info" />
      )}
    </>
  );
}
