import React from 'react'
import VerticalCustomTabs from './VerticalCustomTabs'
import Image from 'next/image';
import LanguageContent from './LanguageContent';
import PrivacyPolicyContent from './PrivacyPolicyContent';

function SettingsContent() {
  const tabs = [
    {
      icon: (
        <Image
          width="24"
          height="24"
          alt="vacations"
          src="/assets/icons/dashboard/settings/language.svg"
        />
      ),
      label: "Language",
      content: <LanguageContent/>,
    },
    {
      icon: (
        <Image
          width="24"
          height="24"
          alt="bonuses"
          src="/assets/icons/dashboard/settings/privacy.svg"
        />
      ),
      label: "Privacy Policy",
      content: <PrivacyPolicyContent/>,
    },
  ];
  return (
    <>
     <div className=" pt-10 bg-dashboardbg ">
     <VerticalCustomTabs  tabs={tabs} defaultTab="Language"/> 
     </div>
    </>
  )
}

export default SettingsContent
