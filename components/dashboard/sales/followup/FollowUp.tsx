import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import CustomTabs from "@/components/dashboard/CustomTabs";

const FollowUp = () => {
  const t = useTranslations("follow_up");
  const tabs = [
    {
      id: "follow-up-list",
      label: t("follow_up"),
      icon: (
        <Image
          width="24"
          height="24"
          alt={t("follow_up")}
          src="/assets/icons/dashboard/sales/customerTabs/followup.svg"
        />
      ),
      content: "",
    },
    {
      id: "follow-up-type",
      label: t("follow_up_type"),
      icon: (
        <Image
          width="24"
          height="24"
          alt={t("follow_up_type")}
          src="/assets/icons/dashboard/sales/customerTabs/followup.svg"
        />
      ),
      content: "",
    },
  ];
  return (
    <CustomTabs
      tabs={tabs}
      defaultTab={tabs[0].id}
      paramName="subtab"
      parentTab="followup"
    />
  );
};

export default FollowUp;
