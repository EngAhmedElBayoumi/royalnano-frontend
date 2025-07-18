"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter, useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";

interface CustomTabsProps {
  tabs: Array<{
    id: string;
    label: string;
    content: React.ReactNode;
    icon?: React.ReactNode;
  }>;
  defaultTab?: string;
  paramName?: string;
  parentTab?: string;
}

function CustomTabs({
  tabs,
  defaultTab = tabs[0]?.id,
  paramName = "tab",
  parentTab,
}: CustomTabsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const locale = useLocale();

  const [activeTab, setActiveTab] = useState<string>(() => {
    return searchParams.get(paramName) || defaultTab;
  });

  useEffect(() => {
    const url = new URL(window.location.href);

    if (parentTab) url.searchParams.set("tab", parentTab);
    if (paramName !== "subtab") url.searchParams.delete("subtab");

    url.searchParams.set(paramName, activeTab);

    router.replace(url.toString(), { scroll: false });
  }, [activeTab, router, paramName, parentTab]);
  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      defaultValue={defaultTab}
      className="mr-auto pt-4 mb-0"
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <TabsList
        className="bg-transparent flex gap-2 justify-start mx-5"
        style={{ overflowX: "auto", overflowY: "hidden", maxWidth: "70vw" }}
      >
        {tabs.map((tab, index) => (
          <TabsTrigger
            key={index}
            value={tab.id}
            className="capitalize data-[state=active]:bg-dashboardBg data-[state=active]:text-primary transition-colors duration-200 p-2 flex items-center gap-2 rounded-t-[20px]"
          >
            <div className="group-data-[state=active]:[&>svg]:fill-primary group-data-[state=active]:[&>svg]:stroke-primary w-5">
              {tab.icon}
            </div>
            <span>{tab.label}</span>
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map((tab, index) => (
        <TabsContent key={index} value={tab.id}>
          <div className="px-6 pb-25">
            <div
              className={`bg-dashboardBg pt-4 mb-5 px-5 ${
                activeTab === defaultTab
                  ? "rounded-b-[20px] ltr:rounded-tr-[20px] rtl:rounded-tl-[20px]"
                  : "rounded-[20px]"
              } `}
            >
              {tab.content}
            </div>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}

export default CustomTabs;
