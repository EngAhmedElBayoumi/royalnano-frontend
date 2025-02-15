"use client";

import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import CustomSelect from "../formFields/CustomSelect";

const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const handleLanguageChange = (newLocale: string) => {
    router.push(pathname, { locale: newLocale });
  };

  return (
    <CustomSelect
    className="bg-black text-white w-[50%] "
      name="language"
    //   label="Language"
      placeholder="Select Language"
      options={[
        { value: "en", label: "English" },
        { value: "ar", label: "العربية" },
      ]}
      value={locale}
      onChange={handleLanguageChange}
    />
  );
};

export default LanguageSwitcher;
