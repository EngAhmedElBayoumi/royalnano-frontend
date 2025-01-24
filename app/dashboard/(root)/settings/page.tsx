import CustomTabs from '@/components/dashboard/CustomTabs'
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
            src="/assets/icons/dashboard/hr/bonuses.svg"
          />
        ),
        label: "Setting",
        content: <h1>gg</h1>,
      },
      {
        icon: (
          <Image
            width="24"
            height="24"
            alt="vacations"
            src="/assets/icons/dashboard/hr/vacations.svg"
          />
        ),
        label: "Permission",
        content:<h1>gg</h1>,
      },
      {
        icon: (
          <Image
            width="24"
            height="24"
            alt="vacations"
            src="/assets/icons/dashboard/hr/vacations.svg"
          />
        ),
        label: "Profile",
        content:<h1>gg</h1>,
      },
   
    ];
  return (
    <div className="px-6 pt-7 pb-25  ">
      <CustomTabs tabs={tabs} defaultTab="Setting" />
      </div>
  )
}
