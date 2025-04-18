"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
// import CustomerInfoTab from "./components/CustomerInfoTab";
// import FollowupsTab from "./components/FollowupsTab";
// import QuotationsTab from "./components/QuotationsTab";
import { useGetSalesCustomerQuery } from "@/redux/services/dashboard/sales/salesCustomerApi";
import { useTranslations } from "next-intl";
import CustomerInfoTab from "@/components/dashboard/sales/customerInfoTab";
import FollowupsTab from "@/components/dashboard/sales/followupTab";
import QuotationsTab from "@/components/dashboard/sales/QuotationsTab";

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

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">{customerData?.customer_name}</h1>
      </div>

      <Tabs defaultValue="info" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="info">{t("Customer.tabs.info")}</TabsTrigger>
          <TabsTrigger value="followups">
            {t("Customer.tabs.followups")}
          </TabsTrigger>
          <TabsTrigger value="quotations">
            {t("Customer.tabs.quotations")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="info">
          <CustomerInfoTab customerData={customerData} />
        </TabsContent>

        <TabsContent value="followups">
          <FollowupsTab customerId={Number(id)} />
        </TabsContent>

        <TabsContent value="quotations">
          <QuotationsTab customerId={Number(id)} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
