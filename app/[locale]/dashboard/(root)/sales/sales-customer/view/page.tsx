"use client";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useGetSalesCustomerQuery } from "@/redux/services/dashboard/sales/salesCustomerApi";
import { useTranslations } from "next-intl";
import CustomerInfoTab from "@/components/dashboard/sales/customerInfoTab";
import FollowupsTab from "@/components/dashboard/sales/followupTab";
import QuotationsTab from "@/components/dashboard/sales/QuotationsTab";
import CustomTabs from "@/components/dashboard/CustomTabs";

export default function SalesCustomerViewPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const t = useTranslations("Sales");

  const {
    data: customerData,
    isLoading: isCustomerLoading,
    error: customerError,
  } = useGetSalesCustomerQuery({ id: Number(id) });

  if (!id || isNaN(Number(id))) {
    router.push("/dashboard/sales");
    return null;
  }

  if (isCustomerLoading) return <div>{t("loading")}</div>;
  if (customerError) return <div>{t("error")}</div>;

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
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">{customerData?.customer_name}</h1>
      </div>

      <CustomTabs tabs={tabs} defaultTab="info" />
    </div>
  );
}
