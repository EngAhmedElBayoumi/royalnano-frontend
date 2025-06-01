import React from "react";
import Image from "next/image";
import CustomTabs from "@/components/dashboard/CustomTabs";
import PermissionsContent from "@/components/dashboard/settingsTabs/PermissionsContent";
import ProfileContent from "@/components/dashboard/settingsTabs/ProfileContent";
import SettingsContent from "@/components/dashboard/settingsTabs/SettingsContent";

export default function Settings() {
  const tabs = [
    {
      id: "setting",
      label: "Setting",
      icon: (
        <Image
          width="24"
          height="24"
          alt="bonuses"
          src="/assets/icons/dashboard/settings/setting.svg"
        />
      ),
      content: <SettingsContent />,
    },
    {
      id: "permission",
      label: "Permission",
      icon: (
        <Image
          width="24"
          height="24"
          alt="vacations"
          src="/assets/icons/dashboard/settings/permission.svg"
        />
      ),
      content: <PermissionsContent />,
    },
    {
      id: "profile",
      label: "Profile",
      icon: (
        <Image
          width="24"
          height="24"
          alt="vacations"
          src="/assets/icons/dashboard/settings/profile.svg"
        />
      ),
      content: <ProfileContent />,
    },
  ];
  return (
    <div className="px-6 pt-7 pb-25  ">
      <CustomTabs tabs={tabs} defaultTab="setting" />
    </div>
  );
}
