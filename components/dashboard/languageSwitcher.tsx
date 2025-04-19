"use client";

import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import CustomSelect from "../formFields/CustomSelect";

const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const handleLanguageChange = (newLocale: string) => {
    const searchParams = new URLSearchParams(window.location.search); // Get current query parameters
    const queryString = searchParams.toString(); // Convert query parameters to a string
    const newPath = queryString ? `${pathname}?${queryString}` : pathname; // Append query string if it exists

    router.push(newPath, { locale: newLocale });
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
      onChange={(value: string | number) =>
        handleLanguageChange(value.toString())
      }
    />
  );
};

export default LanguageSwitcher;
