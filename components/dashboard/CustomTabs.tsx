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

function CustomTabs({ tabs, defaultTab = tabs[0]?.label }: CustomTabsProps) {
  return (
    <Tabs
      defaultValue={defaultTab}
      className="bg-white mr-auto pt-4 mb-0 rounded-tr-[20px] rounded-bl-[20px] rounded-br-[20px]  "
    >
      <TabsList className="bg-transparent flex gap-2  justify-start mx-5">
        {tabs.map((tab, index) => (
          <TabsTrigger
            key={index}
            value={tab.label}
            className="data-[state=active]:bg-dashboardBg data-[state=active]:text-primary transition-colors duration-200 p-2 rounded-lg flex items-center gap-2"
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

export default CustomTabs;
