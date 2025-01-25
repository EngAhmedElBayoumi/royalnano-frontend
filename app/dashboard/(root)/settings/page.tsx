import CustomTabs from '@/components/dashboard/CustomTabs'
import PermissionsContent from '@/components/dashboard/settingsTabs/PermissionsContent';
import ProfileContent from '@/components/dashboard/settingsTabs/ProfileContent';
import SettingsContent from '@/components/dashboard/settingsTabs/SettingsContent';
import Image from 'next/image';
import React from 'react'

export default function Page() {
   const tabs = [
      {
        icon: (
          <Image
            width="24"
            height="24"
            alt="bonuses"
            src="/assets/icons/dashboard/settings/setting.svg"
          />
        ),
        label: "Setting",
        content: <SettingsContent/>,
      },
      {
        icon: (
          <Image
            width="24"
            height="24"
            alt="vacations"
            src="/assets/icons/dashboard/settings/permission.svg"
          />
        ),
        label: "Permission",
        content: <PermissionsContent/>,
      },
      {
        icon: (
          <Image
            width="24"
            height="24"
            alt="vacations"
            src="/assets/icons/dashboard/settings/profile.svg"
          />
        ),
        label: "Profile",
        content:<ProfileContent/>,
      },
   
    ];
  return (
    <div className="px-6 pt-7 pb-25  ">
      <CustomTabs tabs={tabs} defaultTab="Setting" />
      </div>
  )
}
