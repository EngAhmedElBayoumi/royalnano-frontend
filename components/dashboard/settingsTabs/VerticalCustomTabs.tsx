import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CustomTabsProps {
  tabs: Array<{
    label: string;
    content: React.ReactNode;
    icon?: React.ReactNode;
  }>;
  defaultTab?: string;
}

function VerticalCustomTabs({
  tabs,
  defaultTab = tabs[0]?.label,
}: CustomTabsProps) {
  return (
    <Tabs
      defaultValue={defaultTab}
      className="bg-white flex  mr-auto pt-4 mb-0 rounded-t-[20px] rounded-bl-[20px] rounded-br-[20px]  "
    >
      <TabsList className="bg-transparent flex flex-col  gap-2 justify-center mx-5">
        {tabs.map((tab, index) => (
          <TabsTrigger
            key={index}
            value={tab.label}
            className=" border w-[100%] justify-start border-[#7F7F7F] capitalize  data-[state=active]:text-primary transition-colors duration-200 p-2 rounded-lg flex items-center gap-2"
          >
            <div className="group-data-[state=active]:[&>svg]:fill-primary group-data-[state=active]:[&>svg]:stroke-primary">
              {tab.icon}
            </div>
            <span>{tab.label}</span>
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map((tab, index) => (
        <TabsContent key={index} value={tab.label}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}

export default VerticalCustomTabs;
