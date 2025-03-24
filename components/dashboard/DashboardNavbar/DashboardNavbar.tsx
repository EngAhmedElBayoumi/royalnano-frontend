"use client";
import { FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import config from "@/lib/config";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LanguageSwitcher from "../languageSwitcher";

const baseUrl = config.apiUrl;
const DashboardNavbar = () => {
  const methods = useForm();
  const name = useSelector((state: RootState) => state.profile.name);
  const email_address = useSelector(
    (state: RootState) => state.profile.email_address
  );
  const profile_picture = useSelector(
    (state: RootState) => state.profile.profile_picture
  );

  return (
    <nav className="absolute ltr:right-0 rtl:left-0 -top-8 flex justify-end items-center gap-2 pt-10">
      <Avatar>
        <AvatarImage src={baseUrl + profile_picture} />
        <AvatarFallback>{name}</AvatarFallback>
      </Avatar>
      <h3>{name ?? email_address?.substring(0, email_address.indexOf("@"))}</h3>

      <FormProvider {...methods}>
        <LanguageSwitcher />
      </FormProvider>
    </nav>
  );
};

export default DashboardNavbar;
